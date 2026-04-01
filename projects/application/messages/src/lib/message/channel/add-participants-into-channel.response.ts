import { propertyMapper } from '@core/base';

export class AddParticipantsIntoChannelResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();
}
