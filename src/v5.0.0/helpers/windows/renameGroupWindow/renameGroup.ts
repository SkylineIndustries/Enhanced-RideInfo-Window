import {getAllGroups} from "../../ParkStorage";
import {WindowManager} from "../../../ui/windows/WindowManager";

let groupname = ""

export function setName(name: string){
    groupname = name;
}

export function processNameChange(index: number): void{

    const groups = getAllGroups();

    if(groups[index]){
        groups[index][0] = groupname;
    }

    WindowManager.openHome();
}