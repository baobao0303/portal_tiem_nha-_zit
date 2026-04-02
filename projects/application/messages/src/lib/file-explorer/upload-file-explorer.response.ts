import { propertyMapper } from '@core/base';

export class UploadFileExplorerResponse {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('path', String)
  public path: string = '';
}
