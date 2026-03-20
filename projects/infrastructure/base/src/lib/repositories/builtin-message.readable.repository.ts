import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetDefaultBuiltinMessageRequest, GetDefaultBuiltinMessageResponse } from '@application/messages';
import { IBuiltinMessageReadableRepository } from '@core/domain';
import { filter, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class BuiltinMessageReadableRepository extends ReadableRepository implements IBuiltinMessageReadableRepository {
  /**
   * Retrieves the default built-in message based on the provided request.
   *
   * @param {GetDefaultBuiltinMessageRequest} request - The request object containing the parameters for retrieving the default built-in message.
   * @returns {Observable<GetDefaultBuiltinMessageResponse>} An observable that emits the response containing the default built-in message.
   */
  public getDefaultBuiltinMessage(request: GetDefaultBuiltinMessageRequest): Observable<GetDefaultBuiltinMessageResponse[]> {
    const endpoint = `${this._context.endPoint}/BuiltInMessage/get-default-builtin-messages`;

    return this.findAll(endpoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => {
        return data.map((item: any) => {
          return new GetDefaultBuiltinMessageResponse(item);
        });
      }),
    );
  }
}
