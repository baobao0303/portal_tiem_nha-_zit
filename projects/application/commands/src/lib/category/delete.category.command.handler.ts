import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { DeleteCategoryRequest, DeleteCategoryResponse } from '@application/messages';
import { CategoryWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteCategoryCommandHandler implements RequestHandler<DeleteCategoryRequest, DeleteCategoryResponse> {
  repository = inject(CategoryWriteableRepository);

  public handle(request: DeleteCategoryRequest): Observable<DeleteCategoryResponse> {
    return this.repository.deleteCategory(request);
  }
}
