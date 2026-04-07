import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetByIdDepartmentRequest, GetByIdDepartmentResponse } from '@application/messages';
import { DepartmentReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetByIdDepartmentQueryHandler implements RequestHandler<GetByIdDepartmentRequest, GetByIdDepartmentResponse> {
  private readonly departmentRepository = inject(DepartmentReadableRepository);

  /**
   * Handles the request to get a department by its ID.
   *
   * @param {GetByIdDepartmentRequest} request - The request object containing the department ID.
   * @returns {Observable<GetByIdDepartmentResponse>} An observable containing the department details.
   */
  public handle(request: GetByIdDepartmentRequest): Observable<GetByIdDepartmentResponse> {
    const result = this.departmentRepository.getById(request);

    return result;
  }
}
