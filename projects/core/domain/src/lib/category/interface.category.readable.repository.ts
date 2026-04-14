import { GetAllCategoryRequest, GetAllCategoryResponse } from '@application/messages';
import { Observable } from 'rxjs';

export interface InterfaceCategoryReadableRepository {
  getAll(request: GetAllCategoryRequest): Observable<GetAllCategoryResponse>;
}
