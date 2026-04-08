import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { EditErrorRoleResponse, EditRoleRequest, EditRoleResponse } from '@application/messages';
import { RoleWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditRoleCommandHandler implements RequestHandler<EditRoleRequest, EditRoleResponse | EditErrorRoleResponse> {
  private readonly roleWriteableRepository = inject(RoleWriteableRepository);

  /**
   * Handles the edit role request.
   *
   * @param {EditRoleRequest} request - The request object containing the details for editing a role.
   * @returns {Observable<EditRoleResponse | EditErrorRoleResponse>} - The response object indicating the result of the edit operation.
   */
  public handle(request: EditRoleRequest): Observable<EditRoleResponse | EditErrorRoleResponse> {
    const result = this.roleWriteableRepository.editRole(request);

    return result;
  }
}
