import { GetAllUserPaging, GetAllUserRequest } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IUserReadableRepository extends IReadableRepository {
  getAll(request: GetAllUserRequest): Observable<GetAllUserPaging>;
}
