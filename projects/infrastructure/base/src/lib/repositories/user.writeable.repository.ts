import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserErrorResponse, CreateUserRequest, CreateUserResponse } from '@application/messages';
import { ResponseMapper } from '@core/base';
import { IUserWriteableRepository } from '@core/domain';
import { catchError, map, Observable, of } from 'rxjs';
import { WriteableRepository } from '../writeable.repository';

@Injectable({
  providedIn: 'root',
})
export class UserWriteableRepository extends WriteableRepository implements IUserWriteableRepository {
  /**
   * Creates a new user by sending a request to the specified endpoint.
   *
   * @param {CreateUserRequest} request - The request object containing user details.
   * @returns {Observable<CreateUserResponse>} An observable that emits the response of the create user operation.
   */
  public createUser(request: CreateUserRequest): Observable<CreateUserResponse> {
    const endpoint = `${this._context.endPoint}/User/create-user`;
    return this.add(endpoint, request).pipe(
      map((response) => new ResponseMapper(CreateUserResponse).map(response)),
      catchError((error: HttpErrorResponse) => {
        return of(new ResponseMapper(CreateUserErrorResponse).map(error.error));
      })
    );
  }
}
