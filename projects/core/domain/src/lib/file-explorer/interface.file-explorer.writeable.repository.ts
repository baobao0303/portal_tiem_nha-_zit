import {
  DeleteFileExplorerErrorResponse,
  DeleteFileExplorerRequest,
  DeleteFileExplorerResponse,
  UploadFileExplorerErrorResponse,
  UploadFileExplorerRequest,
  UploadFileExplorerResponse,
} from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IFileExplorerWriteableRepository extends IWriteableRepository {
  uploadFileExplorer(request: UploadFileExplorerRequest): Observable<UploadFileExplorerResponse | UploadFileExplorerErrorResponse>;
  deleteFileExplorer(request: DeleteFileExplorerRequest): Observable<DeleteFileExplorerResponse | DeleteFileExplorerErrorResponse>;
}
