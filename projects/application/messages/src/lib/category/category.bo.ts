import { propertyMapper } from "@core/base";

export class CategoryBO {
    @propertyMapper('id', String)
    public id: string = '';

    @propertyMapper('name', String)
    public name: string = '';

    @propertyMapper('slug', String)
    public slug: string = '';

    @propertyMapper('description', String)
    public description: string = '';

    @propertyMapper('parentId', String)
    public parentId: string | null = null;

    @propertyMapper('thumbnail', String)
    public thumbnail: string = '';

    @propertyMapper('isActive', Boolean)
    public isActive: boolean = true;
}
