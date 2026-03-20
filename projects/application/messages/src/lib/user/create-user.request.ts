import { propertyMapper } from '@core/base';
import { CreateUserDepartmentBO } from './create-user.department.bo';
import { CreateUserViewBO } from './create-user.view.bo';

export class CreateUserRequest {
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

  public static builder(): CreateUserRequestBuilder {
    return new CreateUserRequestBuilder(new CreateUserRequest());
  }
}

class CreateUserRequestBuilder {
  private user: CreateUserRequest;

  constructor(user: CreateUserRequest) {
    this.user = user;
  }

  public setFirstName(firstName: string): CreateUserRequestBuilder {
    this.user.firstName = firstName;
    return this;
  }

  public setMiddleName(middleName: string): CreateUserRequestBuilder {
    this.user.middleName = middleName;
    return this;
  }

  public setLastName(lastName: string): CreateUserRequestBuilder {
    this.user.lastName = lastName;
    return this;
  }

  public setCode(code: string): CreateUserRequestBuilder {
    this.user.code = code;
    return this;
  }

  public setEmail(email: string): CreateUserRequestBuilder {
    this.user.email = email;
    return this;
  }

  public setPassword(password: string): CreateUserRequestBuilder {
    this.user.password = password;
    return this;
  }

  public setRoleIds(roleIds: string[]): CreateUserRequestBuilder {
    this.user.roleIds = roleIds;
    return this;
  }

  public setDepartments(departments: CreateUserDepartmentBO[]): CreateUserRequestBuilder {
    this.user.departments = departments;
    return this;
  }

  public setViews(views: CreateUserViewBO[]): CreateUserRequestBuilder {
    this.user.views = views;
    return this;
  }

  public build(): CreateUserRequest {
    return this.user;
  }
}
