import { GetInvitationByChannelIdRequest, GetInvitationByChannelIdResponse, GetInvitationByTokenRequest, GetInvitationByTokenResponse } from '@application/messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReadableRepository } from '../readable.repository';
import { ResponseMapper } from '@core/base';
import { IGetInvitationReadableRepository } from '@core/domain';

@Injectable({
  providedIn: 'root',
})
export class GetInvitationReadableRepository extends ReadableRepository implements IGetInvitationReadableRepository {
  public getInvitationChannelById(request: GetInvitationByChannelIdRequest): Observable<GetInvitationByChannelIdResponse[]> {
    const endPoint = `${this._context.endPoint}/Invitation/get-invitations-by-channel-id?ChannelId=${request.ChannelId}`;
    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetInvitationByChannelIdResponse).map(item))),
    );
  }

  public getInvitationByToken(request: GetInvitationByTokenRequest) {
    const endPoint = `${this._context.endPoint}/Invitation/get-invitation-by-invitation-token?InvitationToken=${request.InvitationToken}`;

    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(GetInvitationByTokenResponse).map(data)),
    );
  }
}
