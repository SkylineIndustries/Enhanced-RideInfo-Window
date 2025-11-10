import {BaseWindow} from "./BaseWindow";
import {WidgetFactory} from "../components/WidgetFactory";
import {WindowManager} from "./WindowManager";
import {getAllGroupsForHomeWindow} from "../../helpers/windows/homeWindow/GetAllGroups";
import {removeGroup} from "../../helpers/windows/homeWindow/removeGroup";

export class HomeWindow extends BaseWindow {
    private selectedGroupIndex: number = 0;

    override build(): WindowDesc {
        const width = 420;
        const height = 260;

        return {
            title: "Home",
            classification: this.windowTag,
            width,
            height,
            minWidth: 300,
            minHeight: 200,
            colours: [0o32, 0o30],
            widgets: [
                WidgetFactory.dropdown((width - 120) / 2, 40, 120, 30, getAllGroupsForHomeWindow(), this.selectedGroupIndex, "groupDropdown", "Select a group", (index: number) => {
                    this.selectedGroupIndex = index;
                }),
                WidgetFactory.button(60, 90, 30, 26, "cheats", "", "addGroup", "Create a new group", () => {
                    WindowManager.openAddGroup();
                }),
                WidgetFactory.button(140, 90, 30, 26, 5165, "", "removeGroup", "Remove selected group", () => {
                    removeGroup(this.selectedGroupIndex);
                }),
                WidgetFactory.button(220, 90, 30, 26, "copy", "", "renameGroup", "Rename selected group", () => {
                }),
                WidgetFactory.button(300, 90, 30, 26, "fast_forward", "", "openGroup", "Open selected group", () => {
                }),
                WidgetFactory.label((width - 280) / 2, height - 30, 280, 20, "MIT License - Enhanced Ride Info by SkylineIndustries"),
            ],
            onClose: (): void => {
                this.window = undefined;
            }
        };
    }
}
