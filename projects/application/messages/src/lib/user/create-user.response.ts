import { propertyMapper } from '@core/base';
import { CreateUserDepartmentBO } from './create-user.department.bo';
import { CreateUserViewBO } from './create-user.view.bo';

export class CreateUserResponse {
  @propertyMapper('firstName', String)
  public firstName: string = '';

  @propertyMapper('middleName', String)
  public middleName: string = '';

  @propertyMapper('lastName', String)
  public lastName: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('email', String)
  public email: string = '';

  @propertyMapper('password', String)
  public password: string = '';

  @propertyMapper('roleIds', String)
  public roleIds: string[] = [];

  @propertyMapper('departments', CreateUserDepartmentBO)
  public departments: CreateUserDepartmentBO[] = [];

  @propertyMapper('views', CreateUserViewBO)
  public views: CreateUserViewBO[] = [];
}
