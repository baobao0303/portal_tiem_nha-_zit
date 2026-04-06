import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetDefaultBuiltinMessageRequest, GetDefaultBuiltinMessageResponse } from '@application/messages';
import { BuiltinMessageReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetDefaultBuiltinMessageQueryHandler implements RequestHandler<GetDefaultBuiltinMessageRequest, GetDefaultBuiltinMessageResponse[]> {
  private readonly builtinMessageReadableRepository = inject(BuiltinMessageReadableRepository);

  /**
   * Handles the request to get the default built-in message.
   *
   * @param {GetDefaultBuiltinMessageRequest} request - The request object containing the necessary parameters.
   * @returns {Observable<GetDefaultBuiltinMessageResponse[]>} An observable containing the response with the default built-in message.
   */
  public handle(request: GetDefaultBuiltinMessageRequest): Observable<GetDefaultBuiltinMessageResponse[]> {
    const result = this.builtinMessageReadableRepository.getDefaultBuiltinMessage(request);

    return result;
  }
}
