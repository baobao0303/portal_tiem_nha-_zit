import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { CreateChannelErrorResponse, CreateChannelMessageRequest, CreateChannelMessageResponse } from '@application/messages';
import { MessageWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

// TODO: Separate folder for channel messages
@Injectable({
  providedIn: 'root',
})
export class CreateChannelCommandHandler implements RequestHandler<CreateChannelMessageRequest, CreateChannelMessageResponse | CreateChannelErrorResponse> {
  private readonly _messageWriteableRepository = inject(MessageWriteableRepository);

  /**
   * Handles the creation of a channel message.
   *
   * @param {CreateChannelMessageRequest} request - The request object containing the details for creating the channel message.
   * @returns {Observable<CreateChannelMessageResponse | CreateChannelErrorResponse> | undefined} - An observable that emits either a successful response or an error response, or undefined if the operation is not applicable.
   */
  public handle(request: CreateChannelMessageRequest): Observable<CreateChannelMessageResponse | CreateChannelErrorResponse> {
    const result = this._messageWriteableRepository.createChannel(request);

    return result;
  }
}
