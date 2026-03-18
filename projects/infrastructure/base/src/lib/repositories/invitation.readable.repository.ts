import { InvitationRequest, InvitationResponse } from '@application/messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { IInvitationReadableRepository } from '@core/domain';
import { ReadableRepository } from '../readable.repository';

@Injectable({
  providedIn: 'root',
})
export class InvitationReadableRepository extends ReadableRepository implements IInvitationReadableRepository {
  public sendInvitations(request: InvitationRequest) {
    const endPoint = `${this._context.endPoint}/Invitation/send-invitations`;

    return this.findInAll(endPoint, request).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: InvitationResponse) => {
        return data;
      }),
    );
  }
}
