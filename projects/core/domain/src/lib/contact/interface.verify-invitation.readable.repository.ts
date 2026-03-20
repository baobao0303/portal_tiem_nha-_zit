import { VerifyInvitationRequest, VerifyInvitationResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IVerifyInvitationReadableRepository extends IReadableRepository {
  verifyInvitation(request: VerifyInvitationRequest): Observable<VerifyInvitationResponse>;
}
