import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { DeleteFileExplorerErrorResponse, DeleteFileExplorerRequest, DeleteFileExplorerResponse } from '@application/messages';
import { FileExplorerWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteFileExplorerCommandHandler implements RequestHandler<DeleteFileExplorerRequest, DeleteFileExplorerResponse | DeleteFileExplorerErrorResponse> {
  private readonly FileExplorerWriteableRepository = inject(FileExplorerWriteableRepository);

  /**
   * Handles the deletion of a file explorer request.
   *
   * @param {DeleteFileExplorerRequest} request - The request object containing details for the file explorer deletion.
   * @returns {Observable<DeleteFileExplorerResponse | DeleteFileExplorerErrorResponse>} - An observable that emits either a successful deletion response or an error response.
   */
  public handle(request: DeleteFileExplorerRequest): Observable<DeleteFileExplorerResponse | DeleteFileExplorerErrorResponse> {
    return this.FileExplorerWriteableRepository.deleteFileExplorer(request);
  }
}
