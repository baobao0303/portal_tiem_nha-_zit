import { propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';

export class GetParticipantsByChannelIdResponse {
  @propertyMapper('activePage', Number)
  public activePage: number = 0;

  @propertyMapper('totalPages', Number)
  public totalPages: number = 0;

  @propertyMapper('totalItems', Number)
  public totalItems: number = 0;

  @propertyMapper('pageSize', Number)
  public pageSize: number = 0;

  @propertyMapper('items', ContactBO)
  public items: ContactBO[] = [];
}
