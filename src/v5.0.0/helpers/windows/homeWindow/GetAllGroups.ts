import {getAllGroups} from "../../ParkStorage";

export function getAllGroupsForHomeWindow(): string[]{
    return getAllGroups().map(group => group[0]);
}