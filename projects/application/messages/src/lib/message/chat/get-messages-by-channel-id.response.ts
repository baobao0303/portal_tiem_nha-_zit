import { propertyMapper } from '@core/base';
import { GetMessagesByChannelIdBO } from './get-messages-by-channel-id.bo';

export class GetMessagesByChannelIdResponse {
  @propertyMapper('items', GetMessagesByChannelIdBO)
  public items: GetMessagesByChannelIdBO[] = [];

  @propertyMapper('activePage', Number)
  public activePage: number = 0;

  @propertyMapper('totalPages', Number)
  public totalPages: number = 0;

  @propertyMapper('totalItems', Number)
  public totalItems: number = 0;

  @propertyMapper('pageSize', Number)
  public pageSize: number = 0;
}
