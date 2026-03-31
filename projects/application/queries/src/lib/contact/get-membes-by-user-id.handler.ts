import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetMembersByUserIdRequest, GetMembersByUserIdResponse } from '@application/messages';
import { MembersReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetMembersByUserIdQueryHandler implements RequestHandler<GetMembersByUserIdRequest, GetMembersByUserIdResponse> {
  private readonly repository = inject(MembersReadableRepository);
  public handle(request: GetMembersByUserIdRequest): Observable<GetMembersByUserIdResponse> {
    const result = this.repository.getAll(request);
    return result;
  }
}
