import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { GetAllCategoryRequest, GetAllCategoryResponse } from '@application/messages';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryReadableRepository extends BaseRepository {
  public getAll(request: GetAllCategoryRequest): Observable<GetAllCategoryResponse> {
    return this.post<GetAllCategoryRequest, GetAllCategoryResponse>(request, 'categories/search', GetAllCategoryResponse);
  }
}
