import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { RequestMapper, ResponseMapper } from '@core/base';
import { IMessageReadableRepository } from '@core/domain';
import { catchError, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class MessageReadableRepository extends ReadableRepository implements IMessageReadableRepository {
  public sendMessagePrompt(request: SendMessagePromptRequest): Observable<SendMessagePromptResponse> {
    const endPoint = `${this._context.endPoint}/OpenAi/GetOpenAI`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.findInAll(endPoint, request, httpOptions).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => {
        return new ResponseMapper(SendMessagePromptResponse).map(data);
      }),
    );
  }

  /**
   * Sends a message prompt to the assistant bot and retrieves the responses.
   *
   * @param {SendMessageAssistantBotRequest} request - The request object containing the message details to be sent to the assistant bot.
   * @returns {Observable<SendMessageAssistantBotResponse[]>} An observable that emits an array of responses from the assistant bot.
   */
  public sendMessagePromptAssistantBot(request: SendMessageAssistantBotRequest): Observable<SendMessageAssistantBotResponse[]> {
    return this.findAll('./assistant-bot.mock.json').pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => data.map((item: any) => new ResponseMapper(SendMessageAssistantBotResponse).map(item))),
    );
  }

  /**
   * Retrieves the count of unread messages for a specific channel.
   *
   * @param {GetCountUnreadMessageRequest} request - The request object containing the channel ID and other parameters.
   * @returns {Observable<GetCountUnreadMessageResponse>} An observable that emits the response containing the count of unread messages.
   */
  public getCountUnreadMessage(request: GetCountUnreadMessageRequest): Observable<GetCountUnreadMessageResponse> {
    const endpoint = `${this._context.endPoint}/Message/count-unread-message`;
    const requestMapper = new RequestMapper(GetCountUnreadMessageRequest).map(request);
    return this.findInAll(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(GetCountUnreadMessageResponse).map(data)),
      catchError(() => []),
    );
  }

  /**
   * Retrieves messages by the specified channel ID.
   *
   * @param {GetMessagesByChannelIdRequest} request - The request object containing the channel ID and other parameters.
   * @returns {Observable<GetMessagesByChannelIdResponse>} An observable that emits the response containing the messages.
   */
  public getMessagesByChannelId(request: GetMessagesByChannelIdRequest): Observable<GetMessagesByChannelIdResponse> {
    const endpoint = `${this._context.endPoint}/Message/get-messages-by-channel-id`;

    return this.findInAll(endpoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(GetMessagesByChannelIdResponse).map(data)),
    );
  }
}
