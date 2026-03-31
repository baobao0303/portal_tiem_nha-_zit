import { propertyMapper } from '@core/base';

// TODO: Separate folder for channel messages
export class UpdateChannelMessageRequest {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description?: string;
}
