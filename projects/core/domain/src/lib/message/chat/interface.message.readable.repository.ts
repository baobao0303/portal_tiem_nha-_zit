import {
  GetCountUnreadMessageRequest,
  GetCountUnreadMessageResponse,
  GetMessagesByChannelIdRequest,
  GetMessagesByChannelIdResponse,
  SendMessageAssistantBotRequest,
  SendMessageAssistantBotResponse,
  SendMessagePromptRequest,
  SendMessagePromptResponse,
} from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IMessageReadableRepository extends IReadableRepository {
  sendMessagePrompt(request: SendMessagePromptRequest): Observable<SendMessagePromptResponse>;
  sendMessagePromptAssistantBot(request: SendMessageAssistantBotRequest): Observable<SendMessageAssistantBotResponse[]>;
  getCountUnreadMessage(request: GetCountUnreadMessageRequest): Observable<GetCountUnreadMessageResponse>;
  getMessagesByChannelId(request: GetMessagesByChannelIdRequest): Observable<GetMessagesByChannelIdResponse>;
}
