import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllCategoryRequest, GetAllCategoryResponse } from '@application/messages';
import { CategoryReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllCategoryQueryHandler implements RequestHandler<GetAllCategoryRequest, GetAllCategoryResponse> {
  repository = inject(CategoryReadableRepository);

  public handle(request: GetAllCategoryRequest): Observable<GetAllCategoryResponse> {
    return this.repository.getAll(request);
  }
}
