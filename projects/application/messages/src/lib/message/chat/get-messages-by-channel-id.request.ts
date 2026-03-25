import { PagingBaseRequest, propertyMapper } from '@core/base';

export class GetMessagesByChannelIdRequest extends PagingBaseRequest {
  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('parentMessageId', String)
  public parentMessageId: string = '';
}
