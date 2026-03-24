import {
  GetChannelByIdRequest,
  GetChannelByIdResponse,
  GetChannelsByUserIdRequest,
  GetChannelsByUserIdResponse,
  GetParticipantsByChannelIdRequest,
  GetParticipantsByChannelIdResponse,
  GetParticipantsInChannelByRoleRequest,
  GetParticipantsInChannelByRoleResponse,
} from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IChannelReadableRepository extends IReadableRepository {
  getChannelById(request: GetChannelByIdRequest): Observable<GetChannelByIdResponse>;
  getChannelsByUserId(request: GetChannelsByUserIdRequest): Observable<GetChannelsByUserIdResponse[]>;
  getParticipantsByChannelId(request: GetParticipantsByChannelIdRequest): Observable<GetParticipantsByChannelIdResponse>;
  getParticipantsInChannelByRole(request: GetParticipantsInChannelByRoleRequest): Observable<GetParticipantsInChannelByRoleResponse[]>;
}
