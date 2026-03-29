import { Injectable } from '@angular/core';
import { ReadableRepository } from '../readable.repository';
import { catchError, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponseMapper } from '@core/base';
import { GetMembersByUserIdRequest, GetMembersByUserIdResponse } from '@application/messages';
import { IMembersReadableRepository } from '@core/domain';

@Injectable({ providedIn: 'root' })
export class MembersReadableRepository extends ReadableRepository implements IMembersReadableRepository {
  /**
   * Retrieves the participants of a contact.
   *
   * @param {GetMembersByUserIdRequest} request - The request object containing the Members ID and other query parameters.
   * @returns {Observable<GetMembersByUserIdResponse>} An observable that emits the response containing the participants of the Members.
   *
   * The request object should have the following properties:
   * - `filters` (string): The filters to apply to the participants list.
   * - `sort` (string): The sorting criteria for the participants list.
   * - `pageSize` (number): The number of participants to retrieve per page.
   * - `page` (number): The page number to retrieve.
   *
   * The response object will be mapped using the `ResponseMapper` to an instance of `GetMembersByUserIdResponse`.
   *
   * The observable will complete when the component is destroyed, using `takeUntilDestroyed`.
   */
  public getAll(request: GetMembersByUserIdRequest): Observable<GetMembersByUserIdResponse> {
    const endpoint = `${this._context.endPoint}/Contact/get-members-by-user-id?Filters=${request.filters}&Sort=${request.sort}&PageSize=${request.pageSize}&Page=${request.page}`;
    return this.findAll(endpoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(GetMembersByUserIdResponse).map(data)),
      catchError(() => []),
    );
  }
}
