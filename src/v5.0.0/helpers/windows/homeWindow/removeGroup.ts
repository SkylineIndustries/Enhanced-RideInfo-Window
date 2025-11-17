import {getAllGroups, saveAllGroups} from "../../ParkStorage";

export function removeGroup(index: number): void {

    const existingGroups: ridesList[] = getAllGroups();

    if (index > existingGroups.length - 1 || index < 0) {
        ui.showError("Invalid Group Selection", "The selected group does not exist.");
        return;
    }

    existingGroups.splice(index, 1);

    saveAllGroups(existingGroups);

    ui.getWindow('HomeWindow').findWidget<DropdownWidget>('groupDropdown').items = getAllGroups().map(group => group[0]);

}