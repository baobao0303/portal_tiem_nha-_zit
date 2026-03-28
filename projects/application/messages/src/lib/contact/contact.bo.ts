import { propertyMapper } from '@core/base';
import { AddressBO } from '../address';

export class ContactBO {
  @propertyMapper('id', String)
  id!: string;

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

  @propertyMapper('dob', Date)
  dob!: Date;

  @propertyMapper('phone', String)
  phone!: string;

  @propertyMapper('email', String)
  email!: string;

  @propertyMapper('avatarUrl', String)
  avatarUrl!: string;

  @propertyMapper('address', AddressBO)
  address!: AddressBO;

  @propertyMapper('description', String)
  description!: string;

  @propertyMapper('createdAt', Date)
  public createdAt: Date = new Date();

  @propertyMapper('updatedAt', Date)
  public updatedAt: Date = new Date();

  @propertyMapper('connectionStatus', Number)
  public connectionStatus: number = 0;

  @propertyMapper('lastActiveAt', Date)
  public lastActiveAt: Date = new Date();

  constructor({
    id,
    code,
    avatarUrl,
    lastName,
    middleName,
    firstName,
    createdAt,
    updatedAt,
    email,
    connectionStatus,
    lastActiveAt,
  }: {
    id?: string;
    code?: string;
    avatarUrl?: string;
    lastName?: string;
    middleName?: string;
    firstName?: string;
    createdAt?: Date;
    updatedAt?: Date;
    email?: string;
    connectionStatus?: number;
    lastActiveAt?: Date;
  } = {}) {
    this.id = id || this.id;
    this.code = code || this.code;
    this.avatarUrl = avatarUrl || this.avatarUrl;
    this.lastName = lastName || this.lastName;
    this.middleName = middleName || this.middleName;
    this.firstName = firstName || this.firstName;
    this.createdAt = createdAt || this.createdAt;
    this.updatedAt = updatedAt || this.updatedAt;
    this.email = email || this.email;
    this.connectionStatus = connectionStatus || this.connectionStatus;
    this.lastActiveAt = lastActiveAt || this.lastActiveAt;
  }
}
