// WindowManager.ts
import { HomeWindow } from "./HomeWindow";
import { AddNewGroupWindow } from "./AddNewGroupWindow";
import {BaseWindow} from "./BaseWindow";
import {RenameGroupWindow} from "./RenameGroupWindow";
import {GroupWindow} from "./GroupWindow";
import {RideWindow} from "./RideWindow";

export class WindowManager {
    private static currentWindow?: BaseWindow;

    static openHome() {
        this._openWindow(new HomeWindow('HomeWindow'));
    }

    static openAddGroup() {
        this._openWindow(new AddNewGroupWindow('addNewGroupWindow'));
    }

    static openRenameGroup(groupId: number) {
         this._openWindow(new RenameGroupWindow('renameGroupWindow', groupId));
    }

    static openGroupWindow(groupId: number) {
        this._openWindow(new GroupWindow('groupWindow', groupId));
    }

    static openRideWindow(groupId: number, rideId: string) {
        this._openWindow(new RideWindow('rideWindow',  groupId, rideId));
        console.log(rideId)
    }

    private static _openWindow(windowInstance: BaseWindow) {
        if (this.currentWindow) {
            this.currentWindow.close();
        }
        this.currentWindow = windowInstance;
        windowInstance.show();
    }
}
