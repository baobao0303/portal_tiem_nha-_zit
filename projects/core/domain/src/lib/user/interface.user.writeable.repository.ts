import { CreateUserRequest, CreateUserResponse } from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IUserWriteableRepository extends IWriteableRepository {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
}
