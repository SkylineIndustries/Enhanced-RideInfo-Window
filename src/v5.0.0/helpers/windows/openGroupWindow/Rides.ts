import {getAllGroups} from "../../ParkStorage";
import {WindowManager} from "../../../ui/windows/WindowManager";

export function getAllRidesFromAGroup(index: number): string[] {
    const groups = getAllGroups();
    if (groups[index]) {
        return groups[index][1];
    } else {
        return [];
    }
}

export function openRide(groupId: number, index: number){
    const groups = getAllGroups();
    const rideId = groups[groupId][1][index];
    WindowManager.openRideWindow(groupId, rideId);
}