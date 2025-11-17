import {WindowManager} from "../../../ui/windows/WindowManager";
import {getAllGroups, saveAllGroups} from "../../ParkStorage";

let ridesData: string[] = [];
let groupName: string = "";

export function getAllRidesNames(): string[] {
    return map.rides.map(ride => ride.name);
}

export function addRideToGroup(index: number): void {
    const rideName = map.rides[index].name;

    if (ridesData.indexOf(rideName) !== -1) {
        ui.showError("Ride already in group", `The ride "${rideName}" is already included in the group.`);
        return;
    }

    ridesData.push(rideName);

    const window = ui.getWindow('addNewGroupWindow');
    if (window) {
        window.findWidget<ListViewWidget>('removeRide').items = ridesData.slice();
    }
}

export function removeRideFromGroup(index: number): void {
    ridesData.splice(index, 1);

    const window = ui.getWindow('addNewGroupWindow');
    if (window) {
        window.findWidget<ListViewWidget>('removeRide').items = ridesData.slice();
    }
}

export function setGroupName(name: string): void {
    groupName = name;
}

export function createNewGroup(): void {
    const existingGroups = getAllGroups();

    if (existingGroups.some(group => group[0] === groupName)) {
        ui.showError("Group Name Exists", `A group with the name "${groupName}" already exists. Please choose a different name.`);
        return;
    }

    existingGroups.push([groupName, ridesData.slice()]);

    saveAllGroups(existingGroups);

    ridesData = [];
    groupName = "";

    WindowManager.openHome();

}
