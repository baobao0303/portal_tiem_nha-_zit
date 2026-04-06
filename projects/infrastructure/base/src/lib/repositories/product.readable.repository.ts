import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllProductRequest, GetAllProductResponse, GetByIdProductRequest, GetByIdProductResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IProductReadableRepository } from '@core/domain';
import { catchError, map, Observable, of } from 'rxjs';
import { ReadableRepository } from '../readable.repository';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductReadableRepository extends ReadableRepository implements IProductReadableRepository {
  public listProducts(request: Partial<{page: number, limit: number, categoryId: string}>): Observable<any> {
    const endPoint = `/api/products`;
    let params = new HttpParams();
    if (request.page) params = params.set('page', request.page);
    if (request.limit) params = params.set('limit', request.limit);
    if (request.categoryId) params = params.set('categoryId', request.categoryId);
    
    return this.httpClient.get(endPoint, { params }).pipe(
      takeUntilDestroyed(this.destroyRef)
    );
  }

  public getAll(request: GetAllProductRequest): Observable<GetAllProductResponse> {
    const endPoint = `${this._context.endPoint}/Product/get-products`;
    const requestMapper = new RequestMapper(GetAllProductRequest).map(request);
    return this.findAll(endPoint, {
      params: new HttpParams({ fromObject: requestMapper }),
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(GetAllProductResponse).map(data)),
      catchError(err => { return of(new GetAllProductResponse) })
    );
  }

  public getById(request: GetByIdProductRequest): Observable<GetByIdProductResponse> {
    const endPoint = `${this._context.endPoint}/Product/get-product-by-id`;
    const requestMapper = new RequestMapper(GetByIdProductRequest).map(request);
    return this.findById(endPoint, '', {
      params: new HttpParams({ fromObject: requestMapper })
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data) => new ResponseMapper(GetByIdProductResponse).map(data)),
      catchError(err => { return of(new GetByIdProductResponse) })
    )
  }
}
