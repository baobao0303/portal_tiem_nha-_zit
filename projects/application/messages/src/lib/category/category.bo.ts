import { propertyMapper } from '@core/base';

export class CategoryBO {
  @propertyMapper('id', String)
  id: string = '';
  @propertyMapper('name', String)
  name: string = '';
  @propertyMapper('slug', String)
  slug: string = '';
  @propertyMapper('description', String)
  description?: string;
  @propertyMapper('parentId', String)
  parentId?: string | null;
  @propertyMapper('thumbnail', String)
  thumbnail?: string;
  @propertyMapper('imageUrl', String)
  imageUrl?: string;
  @propertyMapper('isActive', Boolean)
  isActive: boolean = true;
}
