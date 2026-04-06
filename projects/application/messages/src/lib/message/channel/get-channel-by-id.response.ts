import { propertyMapper } from '@core/base';

export class GetChannelByIdResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('avatarUrl', String)
  public avatarUrl: string = '';

  @propertyMapper('countParticipants', Number)
  public countParticipants: number = 0;
}
