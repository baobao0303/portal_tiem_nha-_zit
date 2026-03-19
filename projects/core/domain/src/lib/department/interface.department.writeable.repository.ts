import { CreateDepartmentRequest, CreateDepartmentResponse, CreateErrorDepartmentResponse, EditDepartmentRequest, EditDepartmentResponse, EditErrorDepartmentResponse } from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IDepartmentWriteableRepository extends IWriteableRepository {
  createDepartment(request: CreateDepartmentRequest): Observable<CreateDepartmentResponse | CreateErrorDepartmentResponse>;
  editDepartment(request: EditDepartmentRequest): Observable<EditDepartmentResponse | EditErrorDepartmentResponse>;
}
