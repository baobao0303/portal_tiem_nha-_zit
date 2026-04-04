import { propertyMapper } from '@core/base';

export class DeleteFileExplorerRequest {
  @propertyMapper('id', String)
  public id: string = '';

  constructor({ id }: { id: string }) {
    this.id = id;
  }
}
