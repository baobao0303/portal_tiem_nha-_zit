import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllCategoryRequest, GetAllCategoryResponse } from '@application/messages';
import { catchError, map, Observable, of } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { InterfaceCategoryReadableRepository } from '@core/domain';

@Injectable({ providedIn: 'root' })
export class CategoryReadableRepository extends ReadableRepository implements InterfaceCategoryReadableRepository {
  public getAll(request: GetAllCategoryRequest): Observable<GetAllCategoryResponse> {
    const endPoint = `/api/categories/search`;

    return this.httpClient.post(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => {
        // Backend ApiResponse wraps: { success: true, data: { data: [...], total: N, activeCount: N, inactiveCount: N } }
        const payload = response?.data ?? response;
        return {
          data: Array.isArray(payload?.data) ? payload.data : [],
          total: payload?.total ?? 0,
          activeCount: payload?.activeCount ?? 0,
          inactiveCount: payload?.inactiveCount ?? 0,
        } as GetAllCategoryResponse;
      }),
      catchError(err => {
        console.error('[CategoryReadableRepository]', err);
        return of({ data: [], total: 0, activeCount: 0, inactiveCount: 0 } as GetAllCategoryResponse);
      })
    );
  }
}
