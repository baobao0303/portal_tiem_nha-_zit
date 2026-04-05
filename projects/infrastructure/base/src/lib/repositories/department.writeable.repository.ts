import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateDepartmentRequest, CreateDepartmentResponse, CreateErrorDepartmentResponse, EditDepartmentRequest, EditDepartmentResponse, EditErrorDepartmentResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { IDepartmentWriteableRepository } from '@core/domain';
import { catchError, map, Observable, of } from 'rxjs';
import { WriteableRepository } from '../writeable.repository';

@Injectable({
  providedIn: 'root',
})
export class DepartmentWriteableRepository extends WriteableRepository implements IDepartmentWriteableRepository {
  /**
   * Creates a new department.
   *
   * @param {CreateDepartmentRequest} request - The request object containing the details of the department to be created.
   * @returns {Observable<CreateDepartmentResponse | CreateErrorDepartmentResponse>} An observable that emits the response of the department creation operation.
   */
  public createDepartment(request: CreateDepartmentRequest): Observable<CreateDepartmentResponse | CreateErrorDepartmentResponse> {
    const endPoint = `${this._context.endPoint}/Department`;
    return this.add(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response) => new ResponseMapper(CreateDepartmentResponse).map(response)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(CreateErrorDepartmentResponse).map(error.error)))
    );
  }

  /**
   * Edits a department with the given request data.
   *
   * @param {EditDepartmentRequest} request - The request object containing the department details to be edited.
   * @returns {Observable<EditDepartmentResponse | EditErrorDepartmentResponse>} An observable that emits the response of the edit operation,
   * either a successful edit response or an error response.
   */
  public editDepartment(request: EditDepartmentRequest): Observable<EditDepartmentResponse | EditErrorDepartmentResponse> {
    const endpoint = `${this._context.endPoint}/Department`;
    return this.update(endpoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response) => new ResponseMapper(EditDepartmentResponse).map(response)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(EditErrorDepartmentResponse).map(error.error)))
    );
  }
}
