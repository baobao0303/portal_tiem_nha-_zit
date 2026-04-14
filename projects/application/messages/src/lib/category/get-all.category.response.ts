import { propertyMapper } from "@core/base";
import { CategoryBO } from "./category.bo";

export class GetAllCategoryResponse {
  @propertyMapper('data', CategoryBO)
  data: CategoryBO[] = [];
  
  @propertyMapper('total', Number)
  total: number = 0;

  @propertyMapper('activeCount', Number)
  activeCount: number = 0;

  @propertyMapper('inactiveCount', Number)
  inactiveCount: number = 0;
}

