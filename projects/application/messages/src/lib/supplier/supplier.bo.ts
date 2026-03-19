import { propertyMapper } from "@core/base";
import { AddressBO } from "../address";

export class SupplierBO {
    @propertyMapper('id', String)
    public id: string = '';

    @propertyMapper('name', String)
    public name: string = '';

    @propertyMapper('abbreviation', String)
    public abbreviation: string = '';

    @propertyMapper('taxCode', String)
    public taxCode: string = '';

    @propertyMapper('description', String)
    public description?: string | null = null;

    @propertyMapper('representativeId', String)
    public representativeId: string = '';

    @propertyMapper('addressId', String)
    public addressId: string = '';

    @propertyMapper('address', AddressBO)
    public address: AddressBO = new AddressBO();
}
