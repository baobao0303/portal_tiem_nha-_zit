import { propertyMapper } from '@core/base';

export class GetAllUserResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('email', String)
  public email: string = '';

  @propertyMapper('lastName', String)
  public lastName: string = '';

  @propertyMapper('middleName', String)
  public middleName: string = '';

  @propertyMapper('firstName', String)
  public firstName: string = '';

  @propertyMapper('avatarUrl', String)
  public avatarUrl: string = '';

  @propertyMapper('createdAt', Date)
  public createdAt: Date = new Date();

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('connectionStatus', Number)
  public connectionStatus: number = 0;

  @propertyMapper('lastActiveAt', Date)
  public lastActiveAt: Date = new Date();

  constructor(init?: Partial<GetAllUserResponse>) {
    Object.assign(this, init);
  }
}
