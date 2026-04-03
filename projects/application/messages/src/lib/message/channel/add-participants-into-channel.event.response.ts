import { propertyMapper } from '@core/base';

export class AddParticipantsIntoChannelEventResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name')
  public name: string = '';

  @propertyMapper('description')
  public description: string = '';

  @propertyMapper('numberOfParticipants')
  public numberOfParticipants: number = 0;
}
