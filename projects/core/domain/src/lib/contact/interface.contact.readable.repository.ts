import { GetByIdContactRequest, GetByIdContactResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IContactReadableRepository extends IReadableRepository {
  getById(request: GetByIdContactRequest): Observable<GetByIdContactResponse>;
}
