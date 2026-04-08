import { BOBase, propertyMapper } from '@core/base';

export class ChannelBO extends BOBase {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('avatarUrl', String)
  public avatarUrl: string = '';
}
