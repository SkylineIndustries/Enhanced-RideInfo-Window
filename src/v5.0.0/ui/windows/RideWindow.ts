import {BaseWindow} from "./BaseWindow";
import {WidgetFactory} from "../components/WidgetFactory";

export class RideWindow extends BaseWindow {

    override build(): WindowDesc {
        const width = 420;
        const height = 260;

        return {
            title: "Ride window",
            classification: this.windowTag,
            width,
            height,
            minWidth: 300,
            minHeight: 200,
            colours: [0o32, 0o30],
            widgets: [
                WidgetFactory.label(20, 20, 200, 20, "Ride window content goes here"),
            ],
            onClose: (): void => {
                this.window = undefined;
            }
        };
    }
}
