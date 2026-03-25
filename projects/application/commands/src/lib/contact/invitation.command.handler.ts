import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { ConfirmInvitationErrorResponse, ConfirmInvitationRequest, ConfirmInvitationResponse } from '@application/messages';
import { InvitationWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvitationCommandHandler implements RequestHandler<ConfirmInvitationRequest, ConfirmInvitationResponse | ConfirmInvitationErrorResponse> {
  private readonly invitationRepository = inject(InvitationWriteableRepository);

  public handle(request: ConfirmInvitationRequest): Observable<ConfirmInvitationResponse | ConfirmInvitationErrorResponse> {
    return this.invitationRepository.confirmInvitation(request);
  }
}
