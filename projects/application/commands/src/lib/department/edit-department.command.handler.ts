import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { EditDepartmentRequest, EditDepartmentResponse, EditErrorDepartmentResponse } from '@application/messages';
import { DepartmentWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditDepartmentCommandHandler implements RequestHandler<EditDepartmentRequest, EditDepartmentResponse | EditErrorDepartmentResponse> {
  private readonly departmentRepository = inject(DepartmentWriteableRepository);

  /**
   * Handles the edit department request.
   *
   * @param {EditDepartmentRequest} request - The request object containing the details for editing a department.
   * @returns {Observable<EditDepartmentResponse | EditErrorDepartmentResponse>} An observable that emits the response of the edit operation.
   */
  public handle(request: EditDepartmentRequest): Observable<EditDepartmentResponse | EditErrorDepartmentResponse> {
    const result = this.departmentRepository.editDepartment(request);

    return result;
  }
}
