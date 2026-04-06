import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetByDepartmentIdsRoleRequest, GetByDepartmentIdsRoleResponse } from '@application/messages';
import { RoleReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetByDepartmentIdsQueryHandler implements RequestHandler<GetByDepartmentIdsRoleRequest, GetByDepartmentIdsRoleResponse[]> {
  private readonly repository = inject(RoleReadableRepository);

  /**
   * Handles the request to get roles by department IDs.
   *
   * @param {GetByDepartmentIdsRoleRequest} request - The request object containing department IDs.
   * @returns {Observable<GetByDepartmentIdsRoleResponse[]>} An observable of an array of role responses.
   */
  public handle(request: GetByDepartmentIdsRoleRequest): Observable<GetByDepartmentIdsRoleResponse[]> {
    const result = this.repository.getByDepartmentIds(request);

    return result;
  }
}
