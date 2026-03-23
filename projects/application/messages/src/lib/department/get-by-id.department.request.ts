import { propertyMapper } from '@core/base';

export class GetByIdDepartmentRequest {
  @propertyMapper('id', String)
  public id: string = '';
}
