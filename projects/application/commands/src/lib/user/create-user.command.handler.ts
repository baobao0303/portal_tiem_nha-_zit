import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { CreateUserErrorResponse, CreateUserRequest, CreateUserResponse } from '@application/messages';
import { UserWriteableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateUserCommandHandler implements RequestHandler<CreateUserRequest, CreateUserResponse | CreateUserErrorResponse> {
  private readonly userRepository = inject(UserWriteableRepository);

  /**
   * Handles the creation of a new user.
   *
   * @param {CreateUserRequest} request - The request object containing user creation details.
   * @returns {Observable<CreateUserResponse | CreateUserErrorResponse>} An observable that emits either a successful user creation response or an error response.
   */
  public handle(request: CreateUserRequest): Observable<CreateUserResponse | CreateUserErrorResponse> {
    const result = this.userRepository.createUser(request);

    return result;
  }
}
