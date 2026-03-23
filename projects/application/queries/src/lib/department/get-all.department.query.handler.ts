import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllDepartmentRequest, GetAllDepartmentResponse } from '@application/messages';
import { DepartmentReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllDepartmentQueryHandler implements RequestHandler<GetAllDepartmentRequest, GetAllDepartmentResponse[]> {
  private readonly _repository = inject(DepartmentReadableRepository);

  /**
   * Handle get all department request
   * @param request GetAllDepartmentRequest
   * @returns Observable<GetAllDepartmentResponse[]>
   * @see {@link DepartmentReadableRepository}
   */
  public handle(request: GetAllDepartmentRequest): Observable<GetAllDepartmentResponse[]> {
    return this._repository.getAll(request);
  }
}
