import { propertyMapper } from '@core/base';

export class UpdateAvatarContactBO {
  @propertyMapper('path', String)
  public path: string = '';

  @propertyMapper('cloudFileId', String)
  public cloudFileId: string = '';

  @propertyMapper('contactId', String)
  public contactId: string = '';
}
