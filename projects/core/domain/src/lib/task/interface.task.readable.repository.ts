import { GetAllTaskRequest, GetAllTaskResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface ITaskReadableRepository extends IReadableRepository {
  getAll(request: GetAllTaskRequest): Observable<GetAllTaskResponse[]>;
}
