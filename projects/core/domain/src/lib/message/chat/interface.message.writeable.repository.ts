import {
  CreateChannelMessageRequest,
  CreateChannelMessageResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  UpdateChannelErrorResponse,
  UpdateChannelMessageRequest,
  UpdateChannelMessageResponse,
} from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IMessageWriteableRepository extends IWriteableRepository {
  createChannel(request: CreateChannelMessageRequest): Observable<CreateChannelMessageResponse>;
  createMessage(request: CreateMessageRequest): Observable<CreateMessageResponse>;
  updateChannel(request: UpdateChannelMessageRequest): Observable<UpdateChannelMessageResponse | UpdateChannelErrorResponse>;
}
