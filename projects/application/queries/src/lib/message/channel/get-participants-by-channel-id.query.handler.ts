import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetParticipantsByChannelIdRequest, GetParticipantsByChannelIdResponse } from '@application/messages';
import { ChannelReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetParticipantsByChannelIdQueryHandler implements RequestHandler<GetParticipantsByChannelIdRequest, GetParticipantsByChannelIdResponse> {
  private readonly _channelReadableRepository = inject(ChannelReadableRepository);

  /**
   * Handles the request to get participants by channel ID.
   *
   * @param {GetParticipantsByChannelIdRequest} request - The request object containing the channel ID.
   * @returns {Observable<GetParticipantsByChannelIdResponse>} An observable that emits the response containing the participants.
   */
  public handle(request: GetParticipantsByChannelIdRequest): Observable<GetParticipantsByChannelIdResponse> {
    const result = this._channelReadableRepository.getParticipantsByChannelId(request);

    return result;
  }
}
