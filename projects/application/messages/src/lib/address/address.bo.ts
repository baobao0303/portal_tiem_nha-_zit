import { propertyMapper } from '@core/base';

export class AddressBO {
  @propertyMapper('street', String)
  street?: string;

  @propertyMapper('ward', String)
  ward?: string;

  @propertyMapper('district', String)
  district?: string;

  @propertyMapper('cityName', String)
  cityName?: string;

  @propertyMapper('address', String)
  address?: string | null;

  @propertyMapper('postCode', String)
  postCode?: string | null;

  @propertyMapper('province', String)
  province?: string | null;

  @propertyMapper('latitude', Number)
  latitude?: number | null;

  @propertyMapper('longitude', Number)
  longitude?: number | null;

  @propertyMapper('cityId', String)
  cityId?: string;

  @propertyMapper('countryId', String)
  countryId?: string | null;

  @propertyMapper('country', String)
  country?: string;
}
