import { CreateProductRequest, CreateProductResponse } from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IProductWriteableRepository extends IWriteableRepository {
  create(request: CreateProductRequest): Observable<CreateProductResponse>;
}
