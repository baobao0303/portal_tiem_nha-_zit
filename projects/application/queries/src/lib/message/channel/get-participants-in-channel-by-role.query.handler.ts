import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetParticipantsInChannelByRoleRequest, GetParticipantsInChannelByRoleResponse } from '@application/messages';
import { ChannelReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetParticipantsInChannelByRoleQueryHandler implements RequestHandler<GetParticipantsInChannelByRoleRequest, GetParticipantsInChannelByRoleResponse[]> {
  private readonly _channelReadableRepository = inject(ChannelReadableRepository);

  /**
   * Handles the request to retrieve participants in a channel filtered by their role.
   *
   * @param request - The request object containing the necessary parameters to fetch participants by role.
   * @returns An observable emitting an array of `GetParticipantsInChannelByRoleResponse` objects, or `undefined` if no result is available.
   */
  public handle(request: GetParticipantsInChannelByRoleRequest): Observable<GetParticipantsInChannelByRoleResponse[]> {
    const result = this._channelReadableRepository.getParticipantsInChannelByRole(request);

    return result;
  }
}
