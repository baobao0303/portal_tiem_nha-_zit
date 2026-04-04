import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetInvitationByTokenRequest, GetInvitationByTokenResponse } from '@application/messages';
import { GetInvitationReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetInvitationQueryHandler implements RequestHandler<GetInvitationByTokenRequest, GetInvitationByTokenResponse> {
  private readonly repository = inject(GetInvitationReadableRepository);
  public handle(request: GetInvitationByTokenRequest): Observable<GetInvitationByTokenResponse> {
    const result = this.repository.getInvitationByToken(request);
    return result;
  }
}
