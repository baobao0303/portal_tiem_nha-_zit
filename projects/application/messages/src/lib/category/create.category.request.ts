import { propertyMapper } from '@core/base';

export class CreateCategoryRequest {
  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('slug', String)
  public slug?: string;

  @propertyMapper('description', String)
  public description?: string;

  @propertyMapper('imageUrl', String)
  public imageUrl?: string;
  
  @propertyMapper('isActive', Boolean)
  public isActive?: boolean = true;
}
