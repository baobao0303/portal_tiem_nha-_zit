import { BOBase, propertyMapper } from '@core/base';

export class FileBO extends BOBase {
  @propertyMapper('id', String)
  public id: string = '';

  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('path', String)
  public path: string = '';

  @propertyMapper('width', Number)
  public width: number = 0;

  @propertyMapper('height', Number)
  public height: number = 0;

  @propertyMapper('mimeType', String)
  public mimeType: string = '';

  @propertyMapper('extension', String)
  public extension: string = '';

  @propertyMapper('size', Number)
  public size: number = 0;

  @propertyMapper('downloadLink', String)
  public downloadLink: string = '';

  @propertyMapper('createdAt', Date)
  public updatedAt: Date = new Date();
}
