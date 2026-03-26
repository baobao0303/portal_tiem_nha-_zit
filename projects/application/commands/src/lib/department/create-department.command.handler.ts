import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { CreateDepartmentRequest, CreateDepartmentResponse, CreateErrorDepartmentResponse } from '@application/messages';
import { DepartmentWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateDepartmentCommandHandler implements RequestHandler<CreateDepartmentRequest, CreateDepartmentResponse | CreateErrorDepartmentResponse> {
  private readonly departmentRepository = inject(DepartmentWriteableRepository);

  /**
   * Handles the creation of a department.
   *
   * @param {CreateDepartmentRequest} request - The request object containing the details for creating a department.
   * @returns {Observable<CreateDepartmentResponse | CreateErrorDepartmentResponse>} - An observable that emits the response of the department creation or an error response, or undefined if not implemented.
   */
  public handle(request: CreateDepartmentRequest): Observable<CreateDepartmentResponse | CreateErrorDepartmentResponse> {
    const result = this.departmentRepository.createDepartment(request);

    return result;
  }
}
