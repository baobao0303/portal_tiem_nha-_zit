import { propertyMapper } from '@core/base';

export class EditContactResponse {
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
  public avatarUrl: string | null = null;

  @propertyMapper('createdAt', String)
  public createdAt: string = '';

  @propertyMapper('updatedAt', String)
  public updatedAt: string = '';

  constructor(init?: Partial<EditContactResponse>) {
    Object.assign(this, init);
  }
}
