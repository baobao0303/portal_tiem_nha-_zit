import { propertyMapper } from '@core/base';
import { AddressBO } from '../../address';

export class GetInvitationByChannelIdResponse {
  @propertyMapper('id', String)
  id: string = '';

  @propertyMapper('firstName', String)
  firstName: string = '';

  @propertyMapper('middleName', String)
  middleName: string = '';

  @propertyMapper('lastName', String)
  lastName: string = '';

  @propertyMapper('genderName', String)
  genderName: string = '';

  @propertyMapper('code', String)
  code: string = '';

  @propertyMapper('dob', Date)
  dob: Date = new Date();

  @propertyMapper('phone', String)
  phone: string = '';

  @propertyMapper('email', String)
  email: string = '';

  @propertyMapper('avatarUrl', String)
  avatarUrl: string = '';

  @propertyMapper('address', AddressBO)
  address!: AddressBO;

  @propertyMapper('description', String)
  description: string = '';

  @propertyMapper('createdAt', Date)
  public createdAt: Date = new Date();

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('connectionStatus', Number)
  public connectionStatus: number = 0;

  @propertyMapper('lastActiveAt', Date)
  public lastActiveAt: Date = new Date();

  @propertyMapper('value', String)
  public value: string = '';

  @propertyMapper('invitationStatus', Boolean)
  public invitationStatus: boolean | null = null;
}
