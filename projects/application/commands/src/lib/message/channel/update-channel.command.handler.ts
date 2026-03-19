import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { UpdateChannelErrorResponse, UpdateChannelMessageRequest, UpdateChannelMessageResponse } from '@application/messages';
import { MessageWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateChannelCommandHandler implements RequestHandler<UpdateChannelMessageRequest, UpdateChannelMessageResponse | UpdateChannelErrorResponse> {
  private readonly _messageWriteableRepository = inject(MessageWriteableRepository);

  /**
   * Handles the update channel message request.
   *
   * @param {UpdateChannelMessageRequest} request - The request object containing the details for updating the channel message.
   * @returns {Observable<UpdateChannelMessageResponse | UpdateChannelErrorResponse>} An observable that emits either the response of the update operation or an error response.
   */
  public handle(request: UpdateChannelMessageRequest): Observable<UpdateChannelMessageResponse | UpdateChannelErrorResponse> {
    const result = this._messageWriteableRepository.updateChannel(request);

    return result;
  }
}
