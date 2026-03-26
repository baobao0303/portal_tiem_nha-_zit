import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { EditContactRequest, EditContactResponse, EditErrorContactResponse } from '@application/messages';
import { ContactWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditContactCommandHandler implements RequestHandler<EditContactRequest, EditContactResponse | EditErrorContactResponse> {
  private readonly contactRepository = inject(ContactWriteableRepository);

  public handle(request: EditContactRequest): Observable<EditContactResponse | EditErrorContactResponse> {
    return this.contactRepository.updateContact(request);
  }
}
