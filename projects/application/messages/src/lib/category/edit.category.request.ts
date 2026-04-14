import { propertyMapper } from '@core/base';

export class EditCategoryRequest {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name?: string;

  @propertyMapper('slug', String)
  public slug?: string;

  @propertyMapper('description', String)
  public description?: string;

  @propertyMapper('imageUrl', String)
  public imageUrl?: string;
  
  @propertyMapper('isActive', Boolean)
  public isActive?: boolean;
}
