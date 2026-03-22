import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetChannelsByUserIdRequest, GetChannelsByUserIdResponse } from '@application/messages';
import { ChannelReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetChannelsByUserIdQueryHandler implements RequestHandler<GetChannelsByUserIdRequest, GetChannelsByUserIdResponse[]> {
  private readonly _channelReadableRepository = inject(ChannelReadableRepository);

  /**
   * Handles the request to get channels by user ID.
   *
   * @param {GetChannelsByUserIdRequest} request - The request object containing the user ID.
   * @returns {Observable<GetChannelsByUserIdResponse[]>} - An observable of the response.
   */
  public handle(request: GetChannelsByUserIdRequest): Observable<GetChannelsByUserIdResponse[]> {
    const result = this._channelReadableRepository.getChannelsByUserId(request);

    return result;
  }
}
