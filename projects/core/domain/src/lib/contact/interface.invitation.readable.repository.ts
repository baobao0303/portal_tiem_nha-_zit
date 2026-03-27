import { InvitationRequest, InvitationResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IInvitationReadableRepository extends IReadableRepository {
  sendInvitations(request: InvitationRequest): Observable<InvitationResponse>;
}
