import { propertyMapper } from '@core/base';

export class GetByDepartmentIdsRoleRequest {
  @propertyMapper('DepartmentIds', String)
  public departmentIds: string[] = [];

  constructor(departmentIds: string[] = []) {
    this.departmentIds = departmentIds;
  }
}
