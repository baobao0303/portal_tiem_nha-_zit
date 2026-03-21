import { Injectable } from '@angular/core';
import { IProductWriteableRepository } from '@core/domain';
import { WriteableRepository } from '../writeable.repository';
import { CreateProductRequest, CreateProductResponse } from '@application/messages';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductWriteableRepository extends WriteableRepository implements IProductWriteableRepository {
  public create(request: CreateProductRequest): Observable<CreateProductResponse> {
    return this.httpClient.post<CreateProductResponse>(
      '/api/products',
      request,
      this.mergeOptions({ withCredentials: true })
    );
  }
}

