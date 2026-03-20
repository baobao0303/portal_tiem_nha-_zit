import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetChannelByIdRequest, GetChannelByIdResponse } from '@application/messages';
import { ChannelReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

// TODO: Separate folder for channel messages
@Injectable({ providedIn: 'root' })
export class GetChannelByIdQueryHandler implements RequestHandler<GetChannelByIdRequest, GetChannelByIdResponse> {
  private readonly _channelReadableRepository = inject(ChannelReadableRepository);

  /**
   * Handles the request to get a channel by its ID.
   *
   * @param {GetChannelByIdRequest} request - The request object containing the ID of the channel to retrieve.
   * @returns {Observable<GetChannelByIdResponse> | undefined} An observable of the response containing the channel details, or undefined if the channel is not found.
   */
  public handle(request: GetChannelByIdRequest): Observable<GetChannelByIdResponse> {
    const result = this._channelReadableRepository.getChannelById(request);

    return result;
  }
}
