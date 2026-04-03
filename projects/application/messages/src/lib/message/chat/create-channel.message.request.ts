import { propertyMapper } from '@core/base';
import { IdBO } from '../../../id.bo';

export class CreateChannelMessageRequest {
  @propertyMapper('name', String)
  public name: string = '';

  @propertyMapper('description', String)
  public description: string = '';

  @propertyMapper('members', IdBO)
  public members: IdBO[] = [];

  @propertyMapper('owners', IdBO)
  public owners: IdBO[] = [];

  @propertyMapper('forced', Boolean)
  public forced: boolean = false;
}
