import { CategoryBO } from "./category.bo";

export interface GetAllCategoryResponse {
  data: CategoryBO[];
  total: number;
}
