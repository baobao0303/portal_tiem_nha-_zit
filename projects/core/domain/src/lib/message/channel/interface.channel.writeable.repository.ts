import {
  AddParticipantsIntoChannelErrorResponse,
  AddParticipantsIntoChannelRequest,
  AddParticipantsIntoChannelResponse,
  DeleteParticipantFromChannelErrorResponse,
  DeleteParticipantFromChannelRequest,
  DeleteParticipantFromChannelResponse,
} from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IChannelWriteableRepository extends IWriteableRepository {
  addParticipantsIntoChannel(request: AddParticipantsIntoChannelRequest): Observable<AddParticipantsIntoChannelResponse | AddParticipantsIntoChannelErrorResponse>;
  deleteParticipantFromChannel(request: DeleteParticipantFromChannelRequest): Observable<DeleteParticipantFromChannelResponse | DeleteParticipantFromChannelErrorResponse>;
}
