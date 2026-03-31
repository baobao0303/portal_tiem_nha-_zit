import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllGendersRequest, GetAllGendersResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { IGendersReadableRepository } from '@core/domain';
import { filter, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({
  providedIn: 'root',
})
export class GendersReadableRepository extends ReadableRepository implements IGendersReadableRepository {
  /**
   * Get all genders
   * @param request GetAllGendersRequest
   * @returns Observable<GetAllGendersResponse[]>
   */
  public getAll(request: GetAllGendersRequest): Observable<GetAllGendersResponse[]> {
    const endPoint = `${this._context.endPoint}/Gender/get-genders`;
    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetAllGendersResponse).map(item)))
    );
  }
}
