import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetByIdProductRequest, GetByIdProductResponse } from '@application/messages';
import { ProductReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetByIdProductQueryHandler implements RequestHandler<GetByIdProductRequest, GetByIdProductResponse> {
  repository = inject(ProductReadableRepository);
  public handle(request: GetByIdProductRequest): Observable<GetByIdProductResponse> {
    return this.repository.getById(request);
  }
}
