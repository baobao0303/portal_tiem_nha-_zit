import { propertyMapper } from '@core/base';

export class EditContactRequest {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('firstName', String)
  public firstName: string = '';

  @propertyMapper('middleName', String)
  public middleName: string = '';

  @propertyMapper('lastName', String)
  public lastName: string = '';

  @propertyMapper('genderId', String)
  public genderId: string = '';

  @propertyMapper('dob', Date)
  public dob: Date = new Date();

  @propertyMapper('phone', String)
  public phone: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('placeOfOrigin', String)
  public placeOfOrigin: string = '';

  @propertyMapper('identityCard', String)
  public identityCard: string = '';

  @propertyMapper('identityIssueAuthority', String)
  public identityIssueAuthority: string = '';

  @propertyMapper('identityIssueDate', Date)
  public identityIssueDate: Date = new Date();

  @propertyMapper('address', String)
  public address: string = '';

  @propertyMapper('postCode', String)
  public postCode: string = '';

  @propertyMapper('province', String)
  public province: string = '';

  @propertyMapper('latitude', Number)
  public latitude: number = 0;

  @propertyMapper('longitude', Number)
  public longitude: number = 0;

  @propertyMapper('cityId', String)
  public cityId: string = '';

  constructor(init?: Partial<EditContactRequest>) {
    Object.assign(this, init);
  }
}
