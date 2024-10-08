import {setIndex, showWindowViewGroup} from "../RideGroupWindow/RideGroupWindow";
import {createListviewWidget, showWindowAddNewGroup} from "../AddGroupWindow/AddGroupWindow";
import {checkGroupName, names, rides, setGroupName} from "../GroupName/GroupName";
import {showInfoWindow} from "../InfoWindow/ShowInfoWindow";


const windowTag = "Enhanced-RideInfo-Window";
let windowChooseGroup: Window = ui.getWindow(windowTag);
let emptyWindow: Window;
let index: number = 0;
let windowShowNameRide: Window = ui.getWindow(windowTag);

export function showWindowChooseGroup(): void {
    index = 0;
    if (windowChooseGroup) {
        windowChooseGroup.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 170,
        height: 80,
        title: 'Enhanced-RideInfo-Window',
        colours: [0o32, 0o30],
        widgets: [
            {
                name: "allIds",
                type: "dropdown",
                width: 150,
                height: 10,
                x: 5,
                y: 20,
                tooltip: "Contains all the groups you made of the rides",
                items: names,
                onChange: (id) => {
                    index = id
                }
            },
            {
                name: "addGroup",
                type: "button",
                width: 30,
                height: 26,
                x: 5,
                y: 40,
                tooltip: "Create new group",
                onClick: () => {
                    createListviewWidget()
                    windowChooseGroup.close()
                    showWindowAddNewGroup()
                },
                image: "cheats",
            },
            {
                name: "removeGroup",
                type: "button",
                width: 30,
                height: 26,
                x: 40,
                y: 40,
                tooltip: "Remove group",
                onClick: () => {
                    if (names[index] == undefined && rides[index] == undefined) {
                        ui.showError("Error remove a group", "No group to remove")
                        return;
                    }
                    names.splice(index,1);
                    rides.splice(index,1);
                    windowChooseGroup.close()
                    showWindowChooseGroup()
                },
                image: 5165,
            },
            {
                name: "seeGroup",
                type: "button",
                width: 30,
                height: 26,
                x: 70,
                y: 40,
                tooltip: "open group ",
                onClick: () => {
                    if (names[index] == undefined && rides[index] == undefined) {
                        ui.showError("Error open group", "No group to open")
                        return;
                    }
                    setIndex(index);
                    showWindowViewGroup();
                    windowChooseGroup.close();
                },
                image: "fast_forward",
            },
            {
                name: "renameGroup",
                type: "button",
                width: 30,
                height: 26,
                x: 100,
                y: 40,
                tooltip: "rename group",
                image: 'copy',
                onClick: () => {
                    if(names[index] != undefined) {
                        showWindowRenameGroup(names[index], index)
                        windowChooseGroup.close()
                    }
                    else {
                        ui.showError("Error renaming group", "No group to rename")
                    }
                }
            },
            {
                name: "infoPlugin",
                type: "button",
                width: 30,
                height: 26,
                x: 130,
                y: 40,
                tooltip: "Open info window",
                image: 'simulate',
                onClick: () => {
                    showInfoWindow()
                }
            }
        ],
        onClose() {
            windowChooseGroup = emptyWindow;
        }
    }
    windowChooseGroup = ui.openWindow(windowDesc);
}

function showWindowRenameGroup(name: string, index: number) {
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
                        ui.showError("Error renaming group", "Group name is empty or group name already exist")
                        return;
                    }
                    else if (checkGroupName(groupName)) {
                        ui.showError("Error renaming group", "Group name is empty or group name already exist")
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



