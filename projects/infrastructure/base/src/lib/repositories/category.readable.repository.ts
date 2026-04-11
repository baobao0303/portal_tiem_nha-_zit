import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllCategoryRequest, GetAllCategoryResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { catchError, map, Observable, of } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoryReadableRepository extends ReadableRepository {
  public getAll(request: GetAllCategoryRequest): Observable<GetAllCategoryResponse> {
    const endPoint = `/api/categories`; // Hitting the Next.js API we just created
    const requestMapper = new RequestMapper(GetAllCategoryRequest).map(request);
    let params = new HttpParams({ fromObject: requestMapper });
    
    return this.httpClient.get(endPoint, { params }).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => {
        // Assume API returns { data: Category[], total: number }
        const res = new GetAllCategoryResponse();
        res.data = response.data || [];
        res.total = response.total || 0;
        return res;
      }),
      catchError(err => { 
        console.error(err);
        return of(new GetAllCategoryResponse()) 
      })
    );
  }
}
