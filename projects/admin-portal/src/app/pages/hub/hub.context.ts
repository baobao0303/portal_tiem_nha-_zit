import { Injectable } from '@angular/core';
import { ViewContext, ViewDataType } from '@view/base';

@Injectable({ providedIn: 'root' })
export class HubContext extends ViewContext {
    private _activeItem: ViewDataType | null = null;

    setActiveItem(item: ViewDataType): void {
        this._activeItem = item;
    }

    getActiveItem(filter?: ViewDataType): ViewDataType {
        return this._activeItem as ViewDataType;
    }

    getViewData(filter?: ViewDataType): ViewDataType | ViewDataType[] {
        return [];
    }
}
