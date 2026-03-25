import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateErrorRoleResponse, CreateRoleRequest, CreateRoleResponse, EditErrorRoleResponse, EditRoleRequest, EditRoleResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IRoleWriteableRepository } from '@core/domain';
import { catchError, map, Observable, of } from 'rxjs';
import { WriteableRepository } from '../writeable.repository';

@Injectable({ providedIn: 'root' })
export class RoleWriteableRepository extends WriteableRepository implements IRoleWriteableRepository {
  /**
   * Creates a new role by sending a request to the specified endpoint.
   *
   * @param {CreateRoleRequest} request - The request object containing the details of the role to be created.
   * @returns {Observable<CreateRoleResponse | CreateErrorRoleResponse>} An observable that emits the response of the role creation operation.
   */
  public createRole(request: CreateRoleRequest): Observable<CreateRoleResponse | CreateErrorRoleResponse> {
    const endPoint = `${this._context.endPoint}/Role`;

    const requestMapper = new RequestMapper(CreateRoleRequest).map(request);

    return this.add(endPoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response) => new ResponseMapper(CreateRoleResponse).map(response)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(CreateErrorRoleResponse).map(error.error)))
    );
  }

  /**
   * Edits an existing role based on the provided request.
   *
   * @param {EditRoleRequest} request - The request object containing the details of the role to be edited.
   * @returns {Observable<EditRoleResponse | EditErrorRoleResponse>} An observable that emits either the response of the edit operation or an error response.
   * @throws {Error} If the method is not implemented.
   */
  public editRole(request: EditRoleRequest): Observable<EditRoleResponse | EditErrorRoleResponse> {
    const endpoint = `${this._context.endPoint}/Role`;

    const requestMapper = new RequestMapper(EditRoleRequest).map(request);

    return this.update(endpoint, requestMapper).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((response) => new ResponseMapper(EditRoleResponse).map(response)),
      catchError((error: HttpErrorResponse) => of(new ResponseMapper(EditErrorRoleResponse).map(error.error)))
    );
  }
}
