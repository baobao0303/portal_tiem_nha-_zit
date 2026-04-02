import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetByIdContactRequest, GetByIdContactResponse } from '@application/messages';
import { ContactReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetByIdContactQueryHandler implements RequestHandler<GetByIdContactRequest, GetByIdContactResponse> {
  private readonly repository = inject(ContactReadableRepository);

  /**
   * Handle get by id contact query
   * @param {GetByIdContactRequest} request
   * @returns {Observable<GetByIdContactResponse>}
   * @see {@link ContactReadableRepository}
   */
  public handle(request: GetByIdContactRequest): Observable<GetByIdContactResponse> {
    const result = this.repository.getById(request);
    return result;
  }
}
