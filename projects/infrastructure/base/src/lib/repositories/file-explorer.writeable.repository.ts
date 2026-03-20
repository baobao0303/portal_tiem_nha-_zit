import { Injectable } from '@angular/core';
import { WriteableRepository } from '../writeable.repository';
import { IFileExplorerWriteableRepository } from '@core/domain';
import {
  UploadFileExplorerRequest,
  UploadFileExplorerResponse,
  UploadFileExplorerErrorResponse,
  DeleteFileExplorerRequest,
  DeleteFileExplorerResponse,
  DeleteFileExplorerErrorResponse,
} from '@application/messages';
import { map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponseMapper } from '@core/base';

@Injectable({ providedIn: 'root' })
export class FileExplorerWriteableRepository extends WriteableRepository implements IFileExplorerWriteableRepository {
  /**
   * Uploads a file to the File Explorer.
   *
   * @param {UploadFileExplorerRequest} request - The request object containing the file to be uploaded.
   * @returns {Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse>} An observable that emits the response or an error response.
   */
  public uploadFileExplorer(request: UploadFileExplorerRequest): Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse> {
    const endpoint = `${this._context.endPoint}/FileExplorer/upload-file`;
    return this.add(endpoint, request.toFileData()).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(UploadFileExplorerResponse).map(data)),
    );
  }

  /**
   * Deletes a file explorer entry based on the provided request.
   *
   * @param {DeleteFileExplorerRequest} request - The request object containing the ID of the file explorer entry to delete.
   * @returns {Observable<DeleteFileExplorerResponse | DeleteFileExplorerErrorResponse>} An observable that emits either a successful response or an error response.
   */
  public deleteFileExplorer(request: DeleteFileExplorerRequest): Observable<DeleteFileExplorerResponse | DeleteFileExplorerErrorResponse> {
    const endpoint = `${this._context.endPoint}/FileExplorer?Id=${request.id}`;

    return this.delete(endpoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(DeleteFileExplorerResponse).map(data)),
    );
  }
}
