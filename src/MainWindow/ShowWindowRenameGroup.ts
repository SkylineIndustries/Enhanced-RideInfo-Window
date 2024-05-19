import {checkGroupName, setGroupName, showWindowChooseGroup} from "./window";
import {showWindowError} from "../ErrorWindow/ShowErrorWindow";

let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
let windowShowNameRide: Window = ui.getWindow(windowTag);

export function showWindowRenameGroup(name: string, index: number) {
    let groupName: string;
    let oldGroupName: string = name;
    if (windowShowNameRide) {
        windowShowNameRide.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 300,
        height: 80,
        title: 'Rename Group ' + name,
        colours: [0o32, 0o30],
        widgets: [
            {
                type: 'textbox',
                x: 5,
                y: 30,
                width: 200,
                height: 30,
                text: name,
                onChange: (name: string) => {
                    groupName = name;
                },
            },
            {
                name: 'ButtonSetName',
                type: 'button',
                x: 260,
                y: 30,
                width: 30,
                height: 30,
                image: 'copy',
                onClick: () => {
                    if (groupName == "") {
                        showWindowError("Group name is empty")
                        return;
                    }
                    else if (checkGroupName(groupName)) {
                        showWindowError("Group name is already exist");
                        return;
                    }
                    setGroupName(index, groupName, oldGroupName);
                console.log("WINDOW IS RENAMED: ", groupName);
                windowShowNameRide.close();
                showWindowChooseGroup();
                },
            }
        ],
        onClose() {
            windowShowNameRide = emptyWindow;
            ui.tool?.cancel()
        },
    }
    windowShowNameRide = ui.openWindow(windowDesc);
}

