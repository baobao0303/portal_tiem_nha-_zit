import { EditContactRequest, EditContactResponse, EditErrorContactResponse, GetByIdContactRequest, GetByIdContactResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IContactWriteableRepository } from '@core/domain';
import { WriteableRepository } from '../writeable.repository';

@Injectable({
  providedIn: 'root',
})
export class ContactWriteableRepository extends WriteableRepository implements IContactWriteableRepository {
  updateContact(request: EditContactRequest): Observable<EditContactResponse | EditErrorContactResponse> {
    const endPoint = `${this._context.endPoint}/Contact/update-contact-by-id`;
    return this.update(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => new ResponseMapper(EditContactResponse).map(response)),
      catchError((error) => {
        return of(new ResponseMapper(EditErrorContactResponse).map(error.error));
      }),
    );
  }
}
