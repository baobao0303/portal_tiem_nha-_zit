import { ViewCommandBase } from '../view.command.base';
import { ViewData } from '../view.type';
import { IDCommand } from './id.command';
export class CloseWindowCommand extends ViewCommandBase {
  constructor(viewCheck: boolean = true) {
    super();
    this.viewActiveChecked(viewCheck);
  }

  protected override execute(data?: ViewData, viewName?: string): void {
    this._viewRenderRegistry.actionHandler(IDCommand.TO_CLOSE_WINDOW, data);
  }
}
