import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { CreateCategoryRequest, CreateCategoryResponse } from '@application/messages';
import { CategoryWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateCategoryCommandHandler implements RequestHandler<CreateCategoryRequest, CreateCategoryResponse> {
  repository = inject(CategoryWriteableRepository);

  public handle(request: CreateCategoryRequest): Observable<CreateCategoryResponse> {
    return this.repository.createCategory(request);
  }
}
