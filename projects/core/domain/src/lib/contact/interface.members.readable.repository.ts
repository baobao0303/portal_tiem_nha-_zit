import { GetMembersByUserIdRequest, GetMembersByUserIdResponse } from '@application/messages';
import { IReadableRepository } from '@core/base';
import { Observable } from 'rxjs';

export interface IMembersReadableRepository extends IReadableRepository {
  getAll(request: GetMembersByUserIdRequest): Observable<GetMembersByUserIdResponse>;
}
