import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetByIdRoleRequest, GetByIdRoleResponse } from '@application/messages';
import { RoleReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetByIdRoleQueryHandler implements RequestHandler<GetByIdRoleRequest, GetByIdRoleResponse> {
  private readonly roleReadableRepository = inject(RoleReadableRepository);

  /**
   * Handles the request to get a role by its ID.
   *
   * @param {GetByIdRoleRequest} request - The request object containing the ID of the role to retrieve.
   * @returns {Observable<GetByIdRoleResponse> } - An observable that emits the role data or undefined if not implemented.
   * @throws {Error} - Throws an error indicating the method is not implemented.
   */
  public handle(request: GetByIdRoleRequest): Observable<GetByIdRoleResponse> {
    const result = this.roleReadableRepository.getByIdRole(request);

    return result;
  }
}
