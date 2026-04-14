import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateCategoryRequest, CreateCategoryResponse, EditCategoryRequest, EditCategoryResponse, DeleteCategoryRequest, DeleteCategoryResponse } from '@application/messages';
import { InterfaceCategoryWriteableRepository } from '@core/domain';
import { WriteableRepository } from '../writeable.repository';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryWriteableRepository extends WriteableRepository implements InterfaceCategoryWriteableRepository {
  public createCategory(request: CreateCategoryRequest): Observable<CreateCategoryResponse> {
    const endPoint = `/api/categories`;
    return this.httpClient.post(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => {
        let res = new CreateCategoryResponse();
        res.success = true;
        res.data = response;
        return res;
      }),
      catchError(err => {
        let res = new CreateCategoryResponse();
        res.success = false;
        return of(res);
      })
    );
  }

  public editCategory(request: EditCategoryRequest): Observable<EditCategoryResponse> {
    const endPoint = `/api/categories/${request.id}`;
    return this.httpClient.put(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => {
        let res = new EditCategoryResponse();
        res.success = true;
        res.data = response;
        return res;
      }),
      catchError(err => {
        let res = new EditCategoryResponse();
        res.success = false;
        return of(res);
      })
    );
  }

  public deleteCategory(request: DeleteCategoryRequest): Observable<DeleteCategoryResponse> {
    const endPoint = `/api/categories/${request.id}`;
    return this.httpClient.delete(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response: any) => {
        let res = new DeleteCategoryResponse();
        res.success = true;
        return res;
      }),
      catchError(err => {
        let res = new DeleteCategoryResponse();
        res.success = false;
        return of(res);
      })
    );
  }
}
