import { propertyMapper } from "@core/base";
import { CategoryBO } from "./category.bo";

export class GetAllCategoryResponse {
    @propertyMapper('data', CategoryBO)
    public data: CategoryBO[] = [];

    @propertyMapper('total', Number)
    public total: number = 0;
}
