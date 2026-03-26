import { propertyMapper } from '@core/base';

// TODO: Separate folder for channel messages
export class UpdateChannelMessageResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description?: string;

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('avatarUrl', String)
  public avatarUrl: string = '';
}
