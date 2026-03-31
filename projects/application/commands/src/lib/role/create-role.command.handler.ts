import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { CreateErrorRoleResponse, CreateRoleRequest, CreateRoleResponse } from '@application/messages';
import { RoleWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateRoleCommandHandler implements RequestHandler<CreateRoleRequest, CreateRoleResponse | CreateErrorRoleResponse> {
  private readonly roleRepository = inject(RoleWriteableRepository);

  /**
   * Handles the creation of a new role.
   *
   * @param {CreateRoleRequest} request - The request object containing the details for the new role.
   * @returns {Observable<CreateRoleResponse | CreateErrorRoleResponse>} An observable that emits either a successful response or an error response.
   */
  public handle(request: CreateRoleRequest): Observable<CreateRoleResponse | CreateErrorRoleResponse> {
    const result = this.roleRepository.createRole(request);

    return result;
  }
}
