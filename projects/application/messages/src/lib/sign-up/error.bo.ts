import { propertyMapper } from '@core/base';

export class ErrorDetail {
  @propertyMapper('propertyName', String)
  public propertyName: string = '';

  @propertyMapper('errorMessage', String)
  public errorMessage: string = '';

  @propertyMapper('attemptedValue', String)
  public attemptedValue: string = '';

  constructor(propertyName: string = '', errorMessage: string = '', attemptedValue: string = '') {
    this.propertyName = propertyName;
    this.errorMessage = errorMessage;
    this.attemptedValue = attemptedValue;
  }
}
