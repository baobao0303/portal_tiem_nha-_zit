import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { CreateMessageErrorResponse, CreateMessageRequest, CreateMessageResponse } from '@application/messages';
import { MessageWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateMessageCommandHandler implements RequestHandler<CreateMessageRequest, CreateMessageResponse | CreateMessageErrorResponse> {
  private readonly _messageWriteableRepository = inject(MessageWriteableRepository);

  /**
   * Handles the creation of a message.
   *
   * @param {CreateMessageRequest} request - The request object containing the details of the message to be created.
   * @returns {Observable<CreateMessageResponse | CreateMessageErrorResponse> } An observable that emits the response of the message creation or an error response, or undefined if the creation fails.
   */
  public handle(request: CreateMessageRequest): Observable<CreateMessageResponse | CreateMessageErrorResponse> {
    const result = this._messageWriteableRepository.createMessage(request);

    return result;
  }
}
