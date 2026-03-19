import { GetAllProductRequest, GetAllProductResponse, GetByIdProductRequest, GetByIdProductResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IProductReadableRepository extends IReadableRepository {
  getAll(request: GetAllProductRequest): Observable<GetAllProductResponse>;
  listProducts(request: Partial<{page: number, limit: number, categoryId: string}>): Observable<any>;
  getById(request: GetByIdProductRequest): Observable<GetByIdProductResponse>;
}
