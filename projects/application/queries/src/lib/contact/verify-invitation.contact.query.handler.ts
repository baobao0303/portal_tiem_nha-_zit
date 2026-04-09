import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { VerifyInvitationRequest, VerifyInvitationResponse } from '@application/messages';
import { VerifyInvitationReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VerifyInvitationQueryHandler implements RequestHandler<VerifyInvitationRequest, VerifyInvitationResponse> {
  private readonly repository = inject(VerifyInvitationReadableRepository);
  public handle(request: VerifyInvitationRequest): Observable<VerifyInvitationResponse> {
    const result = this.repository.verifyInvitation(request);
    return result;
  }
}
