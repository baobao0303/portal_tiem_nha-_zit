import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { DeleteParticipantFromChannelErrorResponse, DeleteParticipantFromChannelRequest, DeleteParticipantFromChannelResponse } from '@application/messages';
import { ChannelWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteParticipantFromChannelCommandHandler
  implements RequestHandler<DeleteParticipantFromChannelRequest, DeleteParticipantFromChannelResponse | DeleteParticipantFromChannelErrorResponse>
{
  private readonly _channelWriteableRepository = inject(ChannelWriteableRepository);

  /**
   * Handles the deletion of a participant from a channel.
   *
   * @param {DeleteParticipantFromChannelRequest} request - The request object containing the details of the participant to be deleted.
   * @returns {Observable<DeleteParticipantFromChannelResponse | DeleteParticipantFromChannelErrorResponse>} An observable that emits either a success response or an error response.
   */
  public handle(request: DeleteParticipantFromChannelRequest): Observable<DeleteParticipantFromChannelResponse | DeleteParticipantFromChannelErrorResponse> {
    const result = this._channelWriteableRepository.deleteParticipantFromChannel(request);

    return result;
  }
}
