
import {rides} from "../GroupName/GroupName";
import {showWindowViewGroup} from "../RideGroupWindow/RideGroupWindow";



let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
let windowRemoveRideFromGroup: Window = ui.getWindow(windowTag);


export function showRemoveRideFromGroupWindow(existingRides: Ride[], id: number): void {
    if (windowRemoveRideFromGroup) {
        windowRemoveRideFromGroup.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 670,
        height: 570,
        title: 'remove ride from group',
        colours: [0o32, 0o30],
        widgets: createListviewWidget(existingRides, id),
        onClose() {
            windowRemoveRideFromGroup = emptyWindow;
        }
    }
    windowRemoveRideFromGroup = ui.openWindow(windowDesc);
}

export function createListviewWidget(existingRides: Ride[], id: number): WidgetDesc[] {
    let rideNames: Ride[] = existingRides;
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
                if (rideIds.some(r => r.name === rideNames[index].name)) {
                    ui.showError("Error selecting ride", "Ride is already selected");
                    return;
                }
                rideIds.push(rideNames[index]);
                windowRemoveRideFromGroup.findWidget<ListViewWidget>('removeRide').items = rideIds.map(r => r.name);
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
                windowRemoveRideFromGroup.findWidget<ListViewWidget>('removeRide').items = rideIds.map(r => r.name);
            }
        },
        {
            name: "removeRideFromGroup",
            type: "button",
            width: 30,
            height: 26,
            x: 5,
            y: 530,
            tooltip: "remove ride from group",
            onClick: () => {
                if (rideIds.length > 0) {
                    removeFromGroup(rideIds, id);
                    rideIds = []
                    windowRemoveRideFromGroup.close();
                } else {
                    ui.showError("Error removing ride to group", "No ride selected");
                }
            },
            image: 5165,
        }
    )
    return widgets
}

function removeFromGroup(ids: Ride[], id: number) {

    if(rides[id][1].length == ids.length){
        ui.showError("Error removing rides from group", "Cannot remove all rides from group.");
        return;
    }

    if (!Array.isArray(ids) || ids.length === 0) {
        ui.showError("Error removing rides from group", "No rides selected for removal.");
        return;
    }

    if (rides[id] && Array.isArray(rides[id][1])) {
        rides[id][1] = rides[id][1].filter(ride => {
            return !ids.some(selectedRide => selectedRide.name === ride.name);
        });
        showWindowViewGroup();
    } else {
        ui.showError("Error removing rides from group", "Cannot remove rides: invalid group or ride list.");
    }
}
