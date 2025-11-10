// WindowManager.ts
import { HomeWindow } from "./HomeWindow";
import { AddNewGroupWindow } from "./AddNewGroupWindow";
import {BaseWindow} from "./BaseWindow";

export class WindowManager {
    private static currentWindow?: BaseWindow;

    static openHome() {
        this._openWindow(new HomeWindow('HomeWindow'));
    }

    static openAddGroup() {
        this._openWindow(new AddNewGroupWindow('addNewGroupWindow'));
    }

    private static _openWindow(windowInstance: BaseWindow) {
        if (this.currentWindow) {
            this.currentWindow.close();
        }
        this.currentWindow = windowInstance;
        windowInstance.show();
    }
}
