import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { UploadFileExplorerErrorResponse, UploadFileExplorerRequest, UploadFileExplorerResponse } from '@application/messages';
import { FileExplorerWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadFileExplorerCommandHandler implements RequestHandler<UploadFileExplorerRequest, UploadFileExplorerResponse | UploadFileExplorerErrorResponse> {
  private readonly FileExplorerWriteableRepository = inject(FileExplorerWriteableRepository);

  /**
   * Handles the upload file explorer request.
   *
   * @param {UploadFileExplorerRequest} request - The request object containing the details for the file explorer upload.
   * @returns {Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse>} An observable that emits either a successful upload response or an error response.
   */
  public handle(request: UploadFileExplorerRequest): Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse> {
    return this.FileExplorerWriteableRepository.uploadFileExplorer(request);
  }
}
