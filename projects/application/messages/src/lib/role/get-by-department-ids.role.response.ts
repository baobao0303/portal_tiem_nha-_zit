import { propertyMapper } from '@core/base';

export class GetByDepartmentIdsRoleResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';
}
