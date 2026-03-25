import { Injectable, inject } from '@angular/core';
import { RequestHandler } from '@application/base';
import { CreateProductRequest, CreateProductResponse } from '@application/messages';
import { ProductWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateProductCommandHandler implements RequestHandler<CreateProductRequest, CreateProductResponse> {
  private repository = inject(ProductWriteableRepository);

  handle(request: CreateProductRequest): Observable<CreateProductResponse> {
    return this.repository.create(request);
  }
}
