import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  GetAllRoleRequest,
  GetAllRoleResponse,
  GetByDepartmentIdsRoleRequest,
  GetByDepartmentIdsRoleResponse,
  GetByIdRoleRequest,
  GetByIdRoleResponse,
} from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IRoleReadableRepository } from '@core/domain';
import { filter, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({ providedIn: 'root' })
export class RoleReadableRepository extends ReadableRepository implements IRoleReadableRepository {
  /**
   * Get All Role
   * @param request
   * @returns Observable<GetAllRoleResponse[] | []>
   */
  public getAll(request: GetAllRoleRequest): Observable<GetAllRoleResponse[]> {
    const endpoint = `${this._context.endPoint}/Role/get-roles`;
    return this.findAll(endpoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetAllRoleResponse).map(item))),
    );
  }

  /**
   * Retrieves roles by department IDs.
   *
   * @param {GetByDepartmentIdsRoleRequest} request - The request object containing department IDs.
   * @returns {Observable<GetByDepartmentIdsRoleResponse[]>} An observable that emits an array of role responses.
   */
  public getByDepartmentIds(request: GetByDepartmentIdsRoleRequest): Observable<GetByDepartmentIdsRoleResponse[]> {
    const endpoint = `${this._context.endPoint}/Role/get-roles-by-department-ids`;
    const requestMapper = { departmentIds: request.departmentIds };
    return this.findInAll(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetByDepartmentIdsRoleResponse).map(item))),
    );
  }

  /**
   * Retrieves roles by their ID.
   *
   * @param {GetByIdRoleRequest} request - The request object containing the ID of the role to retrieve.
   * @returns {Observable<GetByIdRoleResponse>} An observable that emits an array of GetByIdRoleResponse objects.
   */
  public getByIdRole(request: GetByIdRoleRequest): Observable<GetByIdRoleResponse> {
    const endpoint = `${this._context.endPoint}/Role/get-role-by-id`;

    const requestMapper = new RequestMapper(GetByIdRoleRequest).map(request);

    return this.findAll(endpoint, {
      params: new HttpParams({ fromObject: requestMapper }),
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => new ResponseMapper(GetByIdRoleResponse).map(data)),
    );
  }
}
