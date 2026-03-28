import { propertyMapper } from '@core/base';
import { ErrorDetail } from './error.bo';

export class SignUpErrorResponse {
  @propertyMapper('status', Number)
  public status: number = 200;

  @propertyMapper('Error', ErrorDetail)
  public Error: ErrorDetail[] = [];
}
