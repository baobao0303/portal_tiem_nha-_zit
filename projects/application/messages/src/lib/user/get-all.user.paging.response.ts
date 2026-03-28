import { PagingBaseResponse, propertyMapper } from '@core/base';
import { GetAllUserResponse } from './get-all.user.response';

export class GetAllUserPaging extends PagingBaseResponse {
  @propertyMapper('items', GetAllUserResponse)
  items: GetAllUserResponse[] = [];
}
