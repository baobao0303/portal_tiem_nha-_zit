import { propertyMapper } from "@core/base";

export class GetAllCategoryRequest {
    @propertyMapper('search', String)
    public search?: string;

    @propertyMapper('parentId', String)
    public parentId?: string;

    constructor() {}
}
