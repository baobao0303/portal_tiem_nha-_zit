import { propertyMapper } from '@core/base';
import { AddressBO } from '../address';

export class GetByIdContactResponse {
  @propertyMapper('firstName', String)
  firstName!: string;

  @propertyMapper('middleName', String)
  middleName!: string;

  @propertyMapper('lastName', String)
  lastName!: string;

  @propertyMapper('genderName', String)
  genderName!: string;

  @propertyMapper('code', String)
  code!: string;

  @propertyMapper('dob', String)
  dob!: string;

  @propertyMapper('phone', String)
  phone!: string;

  @propertyMapper('email', String)
  email!: string;

  @propertyMapper('avatarUrl', String)
  avatarUrl!: string;

  @propertyMapper('placeOfOrigin', String)
  placeOfOrigin!: string;

  @propertyMapper('ethnicityName', String)
  ethnicityName!: string;

  @propertyMapper('religionName', String)
  religionName!: string;

  @propertyMapper('identityCode', String)
  identityCode!: string;

  @propertyMapper('identityIssueAuthority', String)
  identityIssueAuthority!: string;

  @propertyMapper('identityIssueDate', String)
  identityIssueDate!: string;

  @propertyMapper('address', AddressBO)
  address!: AddressBO;

  @propertyMapper('temporaryAddress', AddressBO)
  temporaryAddress?: AddressBO;

  @propertyMapper('image', String)
  image!: string;

  @propertyMapper('staffQrCode', String)
  qrCode!: string;

  @propertyMapper('taxCode', String)
  taxCode!: string;

  @propertyMapper('note', String)
  note!: string | null;

  @propertyMapper('description', String)
  description!: string;
}
