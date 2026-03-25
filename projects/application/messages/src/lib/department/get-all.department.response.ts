import { propertyMapper } from '@core/base';

export class GetAllDepartmentResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('deparmentHeadMiddleName', String)
  public departmentHeadMiddleName: string = '';

  @propertyMapper('deparmentHeadLastName', String)
  public departmentHeadLastName: string = '';

  @propertyMapper('deparmentHeadFirstName', String)
  public departmentHeadFirstName: string = '';

  @propertyMapper('deparmentHeadAvatar', String)
  public departmentHeadAvatar: string = '';

  // TODO: Need sync with country (VI, EN, JA,...)
  public get departmentHeadFullName(): string {
    const firstName = this.departmentHeadFirstName || '';
    const middleName = this.departmentHeadMiddleName || '';
    const lastName = this.departmentHeadLastName || '';

    return `${firstName} ${middleName} ${lastName}`.trim();
  }
}
