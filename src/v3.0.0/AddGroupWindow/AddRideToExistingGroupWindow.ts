
import {rides} from "../GroupName/GroupName";
import {showWindowViewGroup} from "../RideGroupWindow/RideGroupWindow";



let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
let windowAddRideToGroup: Window = ui.getWindow(windowTag);


export function showWindowAddRideToExistingGroup(existingRides: Ride[], id: number): void {
    if (windowAddRideToGroup) {
        windowAddRideToGroup.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 670,
        height: 570,
        title: 'add ride to existing group',
        colours: [0o32, 0o30],
        widgets: createListviewWidget(existingRides, id),
        onClose() {
            windowAddRideToGroup = emptyWindow;
        }
    }
    windowAddRideToGroup = ui.openWindow(windowDesc);
}

export function createListviewWidget(existingRides: Ride[], id: number): WidgetDesc[] {
    let rideNames: Ride[] = getAllRideNames(existingRides);
    let rideIds: Ride[] = [];
    let widgets: WidgetDesc[] = [];
    widgets.push(
        {
            name: "addRide",
            type: "listview",
            width: 300,
            height: 500,
            x: 5,
            y: 20,
            tooltip: "Select ride to add to group",
            items: rideNames.map(r => r.name),
            onClick: (index: number) => {
                if (rideIds.some(r => r.name === rideNames[index].name) || existingRides.some(r => r.name === rideNames[index].name)){
                    ui.showError("Error selecting ride", "Ride is already selected or in a group");
                    return;
                }
                rideIds.push(rideNames[index]);
                windowAddRideToGroup.findWidget<ListViewWidget>('removeRide').items = rideIds.map(r => r.name);
            }
        },
        {
            name: "removeRide",
            type: "listview",
            width: 300,
            height: 500,
            x: 350,
            y: 20,
            tooltip: "Select ride to remove in a group",
            items: rideIds.map(r => r.name),
            onClick: (index: number) => {
                rideIds.splice(index, 1);
                windowAddRideToGroup.findWidget<ListViewWidget>('removeRide').items = rideIds.map(r => r.name);
            }
        },
        {
            name: "addRide",
            type: "button",
            width: 30,
            height: 26,
            x: 5,
            y: 530,
            tooltip: "add ride to group",
            onClick: () => {
                if (rideIds.length > 0 ){
                    addToGroup(rideIds, id);
                    rideIds = []
                    windowAddRideToGroup.close();
                }
                else {
                    ui.showError("Error adding ride to group", "No ride selected");
                }
            },
            image: "cheats",
        }
    )
    return widgets
}

function getAllRideNames(existingRides: Ride[]): Ride[] {
    let nameRides: Ride[] = [];
    map.rides.sort((a, b) => a.name.localeCompare(b.name)).map(r => nameRides.push(r));

    let nameOfRides: Ride[] = [];
    for (const element of nameRides) {
        if (!existingRides.some(r => r.name === element.name)){
            nameOfRides.push(element)
        }
    }

    return nameOfRides;
}

function addToGroup(ids: Ride[], id: number): void {
    rides[id][1].push(...ids);
    showWindowViewGroup();
}