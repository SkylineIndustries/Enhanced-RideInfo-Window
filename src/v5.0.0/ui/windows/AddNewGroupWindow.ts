import {BaseWindow} from "./BaseWindow";
import {WidgetFactory} from "../components/WidgetFactory";
import {
    addRideToGroup, createNewGroup,
    getAllRidesNames,
    removeRideFromGroup, setGroupName
} from "../../helpers/windows/addNewGroupWindow/AddnewGroupFunction";

export class AddNewGroupWindow extends BaseWindow {
    override build(): WindowDesc {
        const width = 420;
        const height = 260;

        return {
            title: "Add New Group",
            classification: this.windowTag,
            width,
            height,
            minWidth: 420,
            minHeight: 260,
            colours: [0o32, 0o30],
            widgets: [
                WidgetFactory.label(20, 15, 150, 20, "Add a ride to a group"),
                WidgetFactory.label(220, 15, 150, 20, "Remove a ride from a group"),

                WidgetFactory.listView(20, 35, 180, 120, getAllRidesNames(), "addRide", "Ride to add to group", "both",addRideToGroup),
                WidgetFactory.listView(220, 35, 180, 120, [], "removeRide", "Ride to delete from group", "both", removeRideFromGroup),

                WidgetFactory.label(20, 165, 120, 20, "Group name"),
                WidgetFactory.textbox(140, 160, 200, 26, "groupName", "Enter group name", setGroupName),

                WidgetFactory.button(
                    (width / 2) - 60,
                    200,
                    30,
                    26,
                    "cheats",
                    "Add Group",
                    "addGroup",
                    "Create the new group",
                    createNewGroup
                ),
            ],
            onClose: (): void => {
                this.window = undefined;
            }
        };
    }
}
