import { ViewCommandBase } from '../view.command.base';
import { ViewData } from '../view.type';
import { IDCommand } from './id.command';

export class SaveCommand extends ViewCommandBase {
  constructor() {
    super();
    this.viewActiveChecked();
  }

  protected override execute(data?: ViewData): void {
    this._viewRenderRegistry.actionHandler(IDCommand.TO_SAVE, data);
  }
}
