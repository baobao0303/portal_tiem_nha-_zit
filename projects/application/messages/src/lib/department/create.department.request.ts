import { propertyMapper } from '@core/base';

export class CreateDepartmentRequest {
  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('roles', String)
  public roles: string[] = [];
}
