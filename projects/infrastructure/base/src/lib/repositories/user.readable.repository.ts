import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllUserPaging, GetAllUserRequest } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IUserReadableRepository } from '@core/domain';
import { filter, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({
  providedIn: 'root',
})
export class UserReadableRepository extends ReadableRepository implements IUserReadableRepository {
  /**
   * Get all user
   * @param request GetAllUserRequest
   * @returns Observable<GetAllUserPaging>
   */
  public getAll(request: GetAllUserRequest): Observable<GetAllUserPaging> {
    const requestMapper = new RequestMapper(GetAllUserRequest).map(request);

    const endpoint = `${this._context.endPoint}/Contact/get-contacts`;

    return this.findAll(endpoint, {
      params: new HttpParams({ fromObject: requestMapper }),
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data) => new ResponseMapper(GetAllUserPaging).map(data)),
    );
  }
}
