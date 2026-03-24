import { GetByIdContactRequest, GetByIdContactResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { HttpParams } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IContactReadableRepository } from '@core/domain';
import { ReadableRepository } from '../readable.repository';

@Injectable({
  providedIn: 'root',
})
export class ContactReadableRepository extends ReadableRepository implements IContactReadableRepository {
  /**
   * Get all contact
   * @param request GetByIdContactRequest
   * @returns Observable<GetByIdContactResponse>
   */
  public getById(request: GetByIdContactRequest): Observable<GetByIdContactResponse> {
    const endPoint = `${this._context.endPoint}/Contact/get-contact-client-by-id`;
    const requestMapper = new RequestMapper(GetByIdContactRequest).map(request);
    return this.findById(endPoint, '', {
      params: new HttpParams({ fromObject: requestMapper }),
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data) => new ResponseMapper(GetByIdContactResponse).map(data)),
      catchError((err) => {
        return of(new GetByIdContactResponse());
      }),
    );
  }
}
