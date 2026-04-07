import { propertyMapper } from '@core/base';

export class EditDepartmentResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('code', String)
  public code: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('roleIds', String)
  public roleIds: string[] = [];
}
