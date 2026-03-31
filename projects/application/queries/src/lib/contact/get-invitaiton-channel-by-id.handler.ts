import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetInvitationByChannelIdRequest, GetInvitationByChannelIdResponse } from '@application/messages';
import { GetInvitationReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetInvitationByChannelIdHandler implements RequestHandler<GetInvitationByChannelIdRequest, GetInvitationByChannelIdResponse[]> {
  private readonly repository = inject(GetInvitationReadableRepository);

  public handle(request: GetInvitationByChannelIdRequest): Observable<GetInvitationByChannelIdResponse[]> {
    return this.repository.getInvitationChannelById(request);
  }
}
