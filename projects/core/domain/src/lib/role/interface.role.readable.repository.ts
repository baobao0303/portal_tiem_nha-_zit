import { GetAllRoleRequest, GetAllRoleResponse, GetByDepartmentIdsRoleRequest, GetByDepartmentIdsRoleResponse, GetByIdRoleRequest, GetByIdRoleResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IRoleReadableRepository extends IReadableRepository {
  getAll(request: GetAllRoleRequest): Observable<GetAllRoleResponse[]>;
  getByDepartmentIds(request: GetByDepartmentIdsRoleRequest): Observable<GetByDepartmentIdsRoleResponse[]>;
  getByIdRole(request: GetByIdRoleRequest): Observable<GetByIdRoleResponse>;
}
