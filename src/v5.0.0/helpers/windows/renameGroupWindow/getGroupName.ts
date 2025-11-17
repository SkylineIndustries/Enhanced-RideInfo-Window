import {getAllGroups} from "../../ParkStorage";

export function getGroupNameBasedOmIndex(index: number){

    const group = getAllGroups()[index];

    if(group){
        return group[0];
    } else {
        return "Unknown Group";
    }
}