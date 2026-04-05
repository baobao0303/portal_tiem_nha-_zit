import { ConfirmInvitationErrorResponse, ConfirmInvitationRequest, ConfirmInvitationResponse, EditContactRequest, EditContactResponse, EditErrorContactResponse } from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IInvitationWriteableRepository extends IWriteableRepository {
  confirmInvitation(request: ConfirmInvitationRequest): Observable<ConfirmInvitationResponse | ConfirmInvitationErrorResponse>;
}
