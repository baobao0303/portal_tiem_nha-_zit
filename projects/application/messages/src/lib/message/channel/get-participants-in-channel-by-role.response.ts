import { propertyMapper } from '@core/base';

export class GetParticipantsInChannelByRoleResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('firstName', String)
  public firstName: string = '';

  @propertyMapper('middleName', String)
  public middleName: string = '';

  @propertyMapper('lastName', String)
  public lastName: string = '';

  @propertyMapper('email', String)
  public email: string = '';

  @propertyMapper('avatarUrl', String)
  public avatarUrl: string = '';

  @propertyMapper('connectionStatus', Number)
  public connectionStatus: number = 0;

  @propertyMapper('lastActiveAt', Date)
  public lastActiveAt: Date = new Date();
}
