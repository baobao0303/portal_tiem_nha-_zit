import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllRoleRequest, GetAllRoleResponse } from '@application/messages';
import { RoleReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllRoleQueryHandler implements RequestHandler<GetAllRoleRequest, GetAllRoleResponse[]> {
  private readonly repository = inject(RoleReadableRepository);

  /**
   * Handles the request to get all roles.
   *
   * @param {GetAllRoleRequest} request - The request object containing parameters for fetching all roles.
   * @returns {Observable<GetAllRoleResponse[]>} An observable that emits an array of GetAllRoleResponse objects.
   */
  public handle(request: GetAllRoleRequest): Observable<GetAllRoleResponse[]> {
    return this.repository.getAll(request);
  }
}
