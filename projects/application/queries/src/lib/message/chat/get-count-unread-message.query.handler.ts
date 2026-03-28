import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetCountUnreadMessageRequest, GetCountUnreadMessageResponse } from '@application/messages';
import { MessageReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetCountUnreadMessageQueryHandler implements RequestHandler<GetCountUnreadMessageRequest, GetCountUnreadMessageResponse> {
  private readonly _messageReadableRepository = inject(MessageReadableRepository);

  /**
   * Handles the request to get the count of unread messages.
   *
   * @param {GetCountUnreadMessageRequest} request - The request object containing the necessary parameters to get the count of unread messages.
   * @returns {Observable<GetCountUnreadMessageResponse> } - An observable that emits the count of unread messages.
   */
  public handle(request: GetCountUnreadMessageRequest): Observable<GetCountUnreadMessageResponse> {
    const result = this._messageReadableRepository.getCountUnreadMessage(request);

    return result;
  }
}
