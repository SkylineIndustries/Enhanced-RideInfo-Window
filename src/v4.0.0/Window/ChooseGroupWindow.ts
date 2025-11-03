import {names} from "../../v3.0.0/GroupName/GroupName";
import {BaseWindow} from "../BaseWindow/BaseWindow";
import {WidgetFactory} from "../BaseWindow/Widgets/WidgetFactory";

export class ChooseGroupWindow extends BaseWindow {
    
    private static instance: ChooseGroupWindow;
    
    public static getInstance(): ChooseGroupWindow {
        if (!ChooseGroupWindow.instance) ChooseGroupWindow.instance = new ChooseGroupWindow();
        
        return ChooseGroupWindow.instance;
    }
    constructor() {
        super("Enhanced-RideInfo-Window", "Choose a Group", 170, 80, [
            WidgetFactory.createDropdown({
                window: ui.getWindow("MyWindow"),
                name: "allIds",
                x: 5,
                y: 20,
                width: 150,
                height: 10,
                tooltip: "Contains all the groups you made of the rides",
                items: names,
                selectedIndex: 0,
            }),
            
            WidgetFactory.createButton({
                window: ui.getWindow("MyWindow"),
                name: "addGroup",
                width: 30,
                height: 26,
                x: 5,
                y: 40,
                tooltip: "Select the group",
                image: "cheats",
            }),
        ]);
    }
}
