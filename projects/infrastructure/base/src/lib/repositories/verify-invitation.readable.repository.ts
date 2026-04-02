import { VerifyInvitationRequest, VerifyInvitationResponse } from '@application/messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReadableRepository } from '../readable.repository';
import { ResponseMapper } from '@core/base';
import { IVerifyInvitationReadableRepository } from '@core/domain';

@Injectable({
  providedIn: 'root',
})
export class VerifyInvitationReadableRepository extends ReadableRepository implements IVerifyInvitationReadableRepository {
  public verifyInvitation(request: VerifyInvitationRequest) {
    const endPoint = `${this._context.endPoint}/Invitation/verify-invitation?InvitationToken=${request.InvitationToken}`;

    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => new ResponseMapper(VerifyInvitationResponse).map(data)),
    );
  }
}
