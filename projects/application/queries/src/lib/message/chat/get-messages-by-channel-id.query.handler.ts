import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetMessagesByChannelIdRequest, GetMessagesByChannelIdResponse } from '@application/messages';
import { MessageReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetMessagesByChannelIdQueryHandler implements RequestHandler<GetMessagesByChannelIdRequest, GetMessagesByChannelIdResponse> {
  private readonly _messageReadableRepository = inject(MessageReadableRepository);

  /**
   * Handles the request to get messages by channel ID.
   *
   * @param {GetMessagesByChannelIdRequest} request - The request object containing the channel ID.
   * @returns {Observable<GetMessagesByChannelIdResponse> | undefined} - An observable of the response object containing the messages.
   */
  public handle(request: GetMessagesByChannelIdRequest): Observable<GetMessagesByChannelIdResponse> {
    const result = this._messageReadableRepository.getMessagesByChannelId(request);

    return result;
  }
}
