import { EditContactRequest, EditContactResponse, EditErrorContactResponse } from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IContactWriteableRepository extends IWriteableRepository {
  updateContact(request: EditContactRequest): Observable<EditContactResponse | EditErrorContactResponse>;
}
