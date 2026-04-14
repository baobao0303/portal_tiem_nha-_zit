import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { EditCategoryRequest, EditCategoryResponse } from '@application/messages';
import { CategoryWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditCategoryCommandHandler implements RequestHandler<EditCategoryRequest, EditCategoryResponse> {
  repository = inject(CategoryWriteableRepository);

  public handle(request: EditCategoryRequest): Observable<EditCategoryResponse> {
    return this.repository.editCategory(request);
  }
}
