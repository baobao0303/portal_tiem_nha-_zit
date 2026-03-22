import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { AddParticipantsIntoChannelErrorResponse, AddParticipantsIntoChannelRequest, AddParticipantsIntoChannelResponse } from '@application/messages';
import { ChannelWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddParticipantsIntoChannelCommandHandler implements RequestHandler<AddParticipantsIntoChannelRequest, AddParticipantsIntoChannelResponse | AddParticipantsIntoChannelErrorResponse> {
  private readonly _channelWriteableRepository = inject(ChannelWriteableRepository);

  /**
   * Handles the addition of participants into a channel.
   *
   * @param {AddParticipantsIntoChannelRequest} request - The request object containing the details of the participants to be added.
   * @returns {Observable<AddParticipantsIntoChannelResponse | AddParticipantsIntoChannelErrorResponse>} An observable that emits either a success response or an error response.
   */
  public handle(request: AddParticipantsIntoChannelRequest): Observable<AddParticipantsIntoChannelResponse | AddParticipantsIntoChannelErrorResponse> {
    const result = this._channelWriteableRepository.addParticipantsIntoChannel(request);

    return result;
  }
}
