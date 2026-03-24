import { propertyMapper } from "@core/base";
import { SupplierBO } from "../supplier";

export class ProductBO {
    @propertyMapper('id', String)
    public id: string = '';

    @propertyMapper('name', String)
    public name: string = '';

    @propertyMapper('sku', String)
    public sku: string = '';

    @propertyMapper('price', Number)
    public price: number = 0;

    @propertyMapper('unitPriceId', String)
    public unitPriceId: string = '';

    @propertyMapper('unitePrice', String)
    public unitePrice: string = '';

    @propertyMapper('taxPercentage', Number)
    public taxPercentage: number = 0;

    @propertyMapper('description', String)
    public description: string = '';

    @propertyMapper('category', String)
    public category: string = '';

    @propertyMapper('categoryId', String)
    public categoryId: string = '';

    @propertyMapper('supplierId', String)
    public supplierId: string = '';

    @propertyMapper('supplier', SupplierBO)
    public supplier: SupplierBO = new SupplierBO();


    @propertyMapper('qrCode', String)
    public qrCode: string = '';
}
