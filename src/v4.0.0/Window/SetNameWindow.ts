import {BaseWindow} from "../BaseWindow/BaseWindow";
import {WidgetFactory} from "../BaseWindow/Widgets/WidgetFactory";

export class SetNameWindow extends BaseWindow {
    
    private static instance: SetNameWindow;
    
    public static getInstance(): SetNameWindow {
        if (!SetNameWindow.instance) SetNameWindow.instance = new SetNameWindow();
        
        return SetNameWindow.instance;
    }
    constructor() {
        super("Enhanced-RideInfo-Window", "Set the name of the ride", 170, 80, [
            WidgetFactory.createTextBox({
                window: ui.getWindow("MyWindow"),
                name: "name",
                x: 5,
                y: 20,
                width: 150,
                height: 10,
                tooltip: "The name of the ride",
                text: "My Ride",
            }),
            
            WidgetFactory.createButton({
                window: ui.getWindow("MyWindow"),
                name: "setName",
                width: 30,
                height: 26,
                x: 5,
                y: 40,
                tooltip: "Set the name",
                image: "cheats",
            }),
        ]);
    }
    
}