import { GetInvitationByChannelIdRequest, GetInvitationByChannelIdResponse, GetInvitationByTokenRequest, GetInvitationByTokenResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IGetInvitationReadableRepository extends IReadableRepository {
  getInvitationByToken(request: GetInvitationByTokenRequest): Observable<GetInvitationByTokenResponse>;
  getInvitationChannelById(request: GetInvitationByChannelIdRequest): Observable<GetInvitationByChannelIdResponse[]>;
}
