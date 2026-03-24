import { propertyMapper } from '@core/base';

export class GetChannelsByUserIdResponse {
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

  @propertyMapper('lastMessageAt', Date)
  public lastMessageAt?: Date;
}
