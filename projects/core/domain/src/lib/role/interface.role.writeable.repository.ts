import { CreateErrorRoleResponse, CreateRoleRequest, CreateRoleResponse, EditErrorRoleResponse, EditRoleRequest, EditRoleResponse } from '@application/messages';
import { IWriteableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IRoleWriteableRepository extends IWriteableRepository {
  createRole(request: CreateRoleRequest): Observable<CreateRoleResponse | CreateErrorRoleResponse>;
  editRole(request: EditRoleRequest): Observable<EditRoleResponse | EditErrorRoleResponse>;
}
