import { BOBase, propertyMapper } from '@core/base';
import { ContactBO } from '../../contact';

export class ReactionBO extends BOBase {
  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('totalCount', Number)
  public totalCount: number = 0;

  @propertyMapper('messageId', String)
  public messageId: string = '';

  @propertyMapper('channelId', String)
  public channelId: string = '';

  @propertyMapper('contact', ContactBO)
  public contact: ContactBO = new ContactBO();
}
