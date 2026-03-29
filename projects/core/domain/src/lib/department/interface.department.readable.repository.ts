import { GetAllDepartmentRequest, GetAllDepartmentResponse, GetByIdDepartmentRequest, GetByIdDepartmentResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IDepartmentReadableRepository extends IReadableRepository {
  getAll(request: GetAllDepartmentRequest): Observable<GetAllDepartmentResponse[]>;
  getById(request: GetByIdDepartmentRequest): Observable<GetByIdDepartmentResponse>;
}
