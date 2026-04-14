import { propertyMapper } from "@core/base";

export class GetAllCategoryRequest {
  @propertyMapper('search', String)
  search?: string;
  
  @propertyMapper('parentId', String)
  parentId?: string | null;

  @propertyMapper('page_index', Number)
  page_index?: number;
  
  @propertyMapper('page_size', Number)
  page_size?: number;
}
