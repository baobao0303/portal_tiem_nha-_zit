import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllCategoryRequest, GetAllCategoryResponse } from '@application/messages';
import { catchError, map, Observable, of } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoryReadableRepository extends ReadableRepository {
  public getAll(request: GetAllCategoryRequest): Observable<GetAllCategoryResponse> {
    const endPoint = `/api/categories`;
    
    // Xử lý mapping JSON request params
    let params = new HttpParams();
    if (request.search) {
      params = params.set('search', request.search);
    }
    if (request.parentId !== undefined && request.parentId !== null) {
      params = params.set('parentId', request.parentId);
    } else if (request.parentId === null) {
      params = params.set('parentId', 'null');
    }
    
    return this.httpClient.get(endPoint, { params }).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => {
        return {
          data: response.data || [],
          total: response.total || 0
        } as GetAllCategoryResponse;
      }),
      catchError(err => { 
        console.error(err);
        return of({ data: [], total: 0 } as GetAllCategoryResponse);
      })
    );
  }
}
