import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllViewsRequest, GetAllViewsResponse, GetByRoleIdViewRequest, GetByRoleIdViewResponse, GetByVidViewRequest, GetByVidViewResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { IViewReadableRepository } from '@core/domain';
import { map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class ViewReadableRepository extends ReadableRepository implements IViewReadableRepository {
  public getAll(request: GetAllViewsRequest): Observable<GetAllViewsResponse[]> {
    const endPoint = `${this._context.endPoint}/View/get-views`;

    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => {
        return data.map((item: any) => new ResponseMapper(GetAllViewsResponse).map(item));
      })
    );
  }

  public getViewByVid(request: GetByVidViewRequest): Observable<GetByVidViewResponse> {
    const endPoint = `${this._context.endPoint}/View/get-view-by-vid?VId=${request.vid}`;

    return this.findAll<GetByVidViewResponse>(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: GetByVidViewResponse) => {
        if (data && data.title) {
          return new ResponseMapper(GetByVidViewResponse).map(data);
        }
      })
    );
  }

  /**
   * Retrieves a list of views based on the provided role ID.
   *
   * @param {GetByRoleIdViewRequest} request - The request object containing the role ID.
   * @returns {Observable<GetByRoleIdViewResponse[]>} An observable that emits an array of GetByRoleIdViewResponse objects.
   */
  public getViewByRoleId(request: GetByRoleIdViewRequest): Observable<GetByRoleIdViewResponse[]> {
    const endPoint = `${this._context.endPoint}/View/get-views-by-role-id?RoleId=${request.id}`;

    return this.findAll<GetByRoleIdViewResponse[]>(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: GetByRoleIdViewResponse[]) => {
        return data.map((item: any) => new ResponseMapper(GetByRoleIdViewResponse).map(item));
      })
    );
  }
}
