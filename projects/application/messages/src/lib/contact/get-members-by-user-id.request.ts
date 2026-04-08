import { propertyMapper } from '@core/base';

export class GetMembersByUserIdRequest {
  @propertyMapper('filters', String)
  public filters: string = '';

  @propertyMapper('sort', String)
  public sort: string = '';

  @propertyMapper('pageSize', Number)
  public pageSize: number = 16;

  @propertyMapper('page', Number)
  public page: number = 1;

  constructor({ filters = '', sort = '', pageSize = 16, page = 1 }: { channelId?: string; filters?: string; sort?: string; pageSize?: number; page?: number }) {
    this.filters = filters;
    this.sort = sort;
    this.pageSize = pageSize;
    this.page = page;
  }

  /**
   * Sets or updates a filter in the `filters` string based on the provided key and value.
   *
   * @param key - The key to identify the filter.
   * @param value - The value to set for the specified filter key.
   *
   * The method constructs a filter string in the format `And{key}@={value}` and checks if it already exists in the `filters` string.
   * If the filter exists, it updates the value. If the filter does not exist, it appends the new filter to the `filters` string.
   */
  public setFilter(key: string, value: string) {
    const filterPrefix = `And${key}@=`;
    const filterRegex = new RegExp(`${filterPrefix}[^ ]*`, 'g');

    if (this.filters.match(filterRegex)) {
      this.filters = this.filters.replace(filterRegex, `${filterPrefix}${value}`);
    } else {
      this.filters += this.filters ? ` ${filterPrefix}${value}` : `${filterPrefix}${value}`;
    }
  }
}
