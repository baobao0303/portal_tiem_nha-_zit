import { propertyMapper } from '@core/base';

export class DeleteCategoryRequest {
  @propertyMapper('id', String)
  public id: string = '';
}
