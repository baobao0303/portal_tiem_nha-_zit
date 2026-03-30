import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllProductRequest, GetAllProductResponse } from '@application/messages';
import { ProductReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllProductQueryHandler implements RequestHandler<GetAllProductRequest, GetAllProductResponse> {
  repository = inject(ProductReadableRepository);

  public handle(request: GetAllProductRequest): Observable<GetAllProductResponse> {
    return this.repository.getAll(request);
  }
}
