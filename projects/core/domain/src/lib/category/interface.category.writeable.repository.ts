import { CreateCategoryRequest, CreateCategoryResponse, EditCategoryRequest, EditCategoryResponse, DeleteCategoryRequest, DeleteCategoryResponse } from '@application/messages';
import { Observable } from 'rxjs';

export interface InterfaceCategoryWriteableRepository {
  createCategory(request: CreateCategoryRequest): Observable<CreateCategoryResponse>;
  editCategory(request: EditCategoryRequest): Observable<EditCategoryResponse>;
  deleteCategory(request: DeleteCategoryRequest): Observable<DeleteCategoryResponse>;
}
