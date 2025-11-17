import {BaseWindow} from "./BaseWindow";
import {WidgetFactory} from "../components/WidgetFactory";
import {getAllRidesFromAGroup, openRide} from "../../helpers/windows/openGroupWindow/Rides";

export class GroupWindow extends BaseWindow {

    override build(): WindowDesc {
        const width = 420;
        const height = 260;

        return {
            title: "Rides Group",
            classification: this.windowTag,
            width,
            height,
            minWidth: 300,
            minHeight: 200,
            colours: [0o32, 0o30],
            widgets: [
                WidgetFactory.listView(20, 35, 380, 200, getAllRidesFromAGroup(this.groupId!), "rideList", "List of rides in group", "both", (rideId: number): void => {
                    openRide(this.groupId!, rideId);
                }),
            ],
            onClose: (): void => {
                this.window = undefined;
            }
        };
    }
}
