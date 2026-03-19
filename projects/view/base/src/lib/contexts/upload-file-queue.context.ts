import { inject, Injectable } from '@angular/core';
import { DeleteFileExplorerCommandHandler, UploadFileExplorerCommandHandler } from '@application/commands';
import { DeleteFileExplorerRequest, UploadFileExplorerErrorResponse, UploadFileExplorerRequest, UploadFileExplorerResponse } from '@application/messages';
import { catchError, finalize, Observable } from 'rxjs';
import { FileQueueItem, FileQueueStatus } from '../file-queue-item';
import { UploadType } from '@application/base';

@Injectable({ providedIn: 'root' })
export class UploadFileQueueContext {
  private readonly uploadFileExplorerCommandHandler = inject(UploadFileExplorerCommandHandler);
  private readonly deleteFileExplorerCommandHandler = inject(DeleteFileExplorerCommandHandler);

  /**
   * Define the queue of files to upload
   * 1. Key: unique identifier of the file
   * 2. Value: FileQueueItem
   */
  private readonly fileQueue = new Map<string, FileQueueItem>();

  public get queue(): FileQueueItem[] {
    return Array.from(this.fileQueue.values());
  }

  public get count(): number {
    return this.fileQueue.size;
  }

  public get hasProgress(): boolean {
    return this.queue.some((file) => file.inProgress);
  }

  public getFileQueueItem(id: string): FileQueueItem | undefined {
    return this.fileQueue.get(id);
  }

  /**
   * Adds a file to the upload queue.
   * @param file The file to be uploaded.
   * @returns The `FileQueueItem` instance for tracking.
   */
  public addFile(id: string, file: File, uploadType: UploadType): FileQueueItem {
    if (this.fileQueue.has(id)) {
      return this.fileQueue.get(id)!;
    }

    const fileObj = new FileQueueItem(file);
    this.fileQueue.set(id, fileObj);

    // Assign upload, cancel, remove, delete, and retry methods to the file object
    fileObj.upload = () => this.uploadFile(id, uploadType);
    fileObj.cancel = () => this.cancelUpload(id);
    fileObj.remove = () => this.removeFile(id);
    fileObj.delete = () => this.deleteFile(id);
    fileObj.retry = () => this.retryUpload(id);

    return fileObj;
  }

  /**
   * Removes a file from the upload queue.
   * @param id The unique identifier of the file.
   */
  private removeFile(id: string): void {
    if (this.fileQueue.has(id)) {
      this.fileQueue.get(id)!.cancel();
    }

    this.fileQueue.delete(id);
  }

  /**
   * Uploads a file to the server.
   * @param id The unique identifier of the file.
   * @returns Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse>
   */
  private uploadFile(id: string, uploadType: UploadType): Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse> {
    const fileObj = this.fileQueue.get(id);
    if (!fileObj || !fileObj.isPending) {
      return new Observable<UploadFileExplorerErrorResponse>((observer) => {
        observer.error({
          title: 'Invalid File',
          status: 400,
          detail: 'File is not in a pending state or does not exist in the queue.',
        });
      });
    }

    fileObj.status = FileQueueStatus.Progress;

    // Ensure file exists
    if (!fileObj.file) {
      return new Observable<UploadFileExplorerErrorResponse>((observer) => {
        observer.error({
          title: 'File Not Found',
          status: 404,
          detail: 'The file object is missing.',
        });
      });
    }

    const request = new UploadFileExplorerRequest({ file: fileObj.file, uploadType: uploadType });

    return new Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse>((observer) => {
      fileObj.request = this.uploadFileExplorerCommandHandler
        .handle(request)
        .pipe(
          catchError((error) => {
            fileObj.status = FileQueueStatus.Error;
            fileObj.response = error;

            const errorResponse: UploadFileExplorerErrorResponse = {
              title: 'Upload Failed',
              status: error.status || 500,
              detail: error.message || 'An unexpected error occurred during file upload.',
            };

            observer.error(errorResponse);
            return [];
          }),
          finalize(() => {
            fileObj.request = null;
          }),
        )
        .subscribe({
          next: (response) => {
            console.log('response', response);
            if (response instanceof UploadFileExplorerErrorResponse) {
              fileObj.status = FileQueueStatus.Error;
              observer.error(response);
              return;
            } else {
              fileObj.status = FileQueueStatus.Success;
              fileObj.response = response;
              observer.next(response);
              observer.complete();
            }
          },
          error: (error) => {
            fileObj.status = FileQueueStatus.Error;
            fileObj.response = error;
            observer.error(error);
          },
        });
    });
  }

  /**
   * Cancels the upload of a file.
   * @param id The unique identifier of the file.
   */
  private cancelUpload(id: string): void {
    if (this.fileQueue.has(id)) {
      this.fileQueue.get(id)!.request?.unsubscribe();
      this.fileQueue.get(id)!.status = FileQueueStatus.Pending;
    }
  }

  /**
   * Deletes a file from the server.
   * @param id The unique identifier of the file.
   */
  private deleteFile(id: string): void {
    const fileObj = this.fileQueue.get(id);
    if (!fileObj || !fileObj.isSuccess) return;

    const response = fileObj.response;
    if (!response || !response.id) return;

    const request = new DeleteFileExplorerRequest({ id: response.id });
    this.deleteFileExplorerCommandHandler.handle(request).subscribe({
      next: () => {
        this.removeFile(id);
      },
    });
  }

  /**
   * Retries uploading a file.
   * @param id The unique identifier of the file.
   */
  private retryUpload(id: string): Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse> {
    const fileObj = this.fileQueue.get(id);
    if (!fileObj || !fileObj.isError) {
      return new Observable<UploadFileExplorerErrorResponse>((observer) => {
        observer.error({
          title: 'Invalid File',
          status: 400,
          detail: 'File is not in an error state or does not exist in the queue.',
        });
      });
    }

    fileObj.status = FileQueueStatus.Pending;

    return fileObj.upload();
  }
}
