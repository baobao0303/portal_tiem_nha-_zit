import { UploadFileExplorerErrorResponse, UploadFileExplorerResponse } from '@application/messages';
import { Observable, Subscription } from 'rxjs';

export enum FileQueueStatus {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR',
  Progress = 'PROGRESS',
}

export class FileQueueItem {
  public file?: File;
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public request: Subscription | null = null;
  public response?: UploadFileExplorerResponse | null = null;

  constructor(file: File) {
    this.file = file;
  }

  public get isPending(): boolean {
    return this.status === FileQueueStatus.Pending;
  }

  public get isSuccess(): boolean {
    return this.status === FileQueueStatus.Success;
  }

  public get isError(): boolean {
    return this.status === FileQueueStatus.Error;
  }

  public get inProgress(): boolean {
    return this.status === FileQueueStatus.Progress;
  }

  public get isCompleted(): boolean {
    return this.isSuccess || this.isError;
  }

  public upload!: () => Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse>;
  public cancel!: () => void;
  public remove!: () => void;
  public delete!: () => void;
  public retry!: () => Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse>;
}
