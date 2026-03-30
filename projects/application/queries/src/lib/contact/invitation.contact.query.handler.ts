import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { InvitationRequest, InvitationResponse } from '@application/messages';
import { InvitationReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvitationQueryHandler implements RequestHandler<InvitationRequest, InvitationResponse> {
  private readonly repository = inject(InvitationReadableRepository);
  public handle(request: InvitationRequest): Observable<InvitationResponse> {
    const result = this.repository.sendInvitations(request);
    return result;
  }
}
