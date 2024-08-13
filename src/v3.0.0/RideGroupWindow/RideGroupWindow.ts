import {openRideWindow} from "../RideWindow/RideWindowFunctions";
import {ArgsRemove} from "../Args/ArgsRemove";
import {closeWindowShowStall} from "../StallWindow/StallWindow";
import {windowShowRide} from "../RideWindow/RideWindow";
import {names, rides} from "../GroupName/GroupName";

const windowTag = "Enhanced-RideInfo-Window";
export let windowViewGroup: Window = ui.getWindow(windowTag);
let emptyWindow: Window;
let index: number = 0;

export function showWindowViewGroup(): void {
    if (windowViewGroup) {
        windowViewGroup.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 310,
        height: 750,
        title: 'View group ' + names[index],
        colours: [0o32, 0o30],
        widgets: getAllRidesOfAGroup(index),
        onClose() {
            windowViewGroup = emptyWindow;
        }
    }
    windowViewGroup = ui.openWindow(windowDesc);
}

function getAllRidesOfAGroup(id: number): WidgetDesc[] {
    let height = 30;
    let widgets: WidgetDesc[] = [];
    let ride: string[] = [];
    let ride1: Ride[] = [];

    rides[id][1].forEach(rideInfo => {
        ride.push(rideInfo.name);
        ride1.push(rideInfo)
    });

    let listview: ListViewItem = ride;


    widgets.push( {
            name: "ListViewAllRides",
            type: "listview",
            width: 300,
            height: 600,
            x: 5,
            y: height,
            tooltip: "Open a ride",
            items: listview,
            canSelect: true,
            onClick: (item: number) => {
                openRideWindow(ride1[item])
            }
        },
        {
            name: "groupStatus",
            type: "dropdown",
            width: 60,
            height: 26,
            x: 5,
            y: 640,
            tooltip: "Change status of all rides in this group",
            items: ["Closed", "Open", "Testing"],
            onChange: (id) => {
                for (const element of ride1) {
                    context.executeAction("ridesetstatus", {ride: element.id, status: id })
                }
            }
        },
        {
            name: "Total-customers",
            type: 'label',
            x: 100,
            y: 640,
            width: 550,
            height: 10,
            text: "Total customers: " + calculateCustomers(ride1)
        },
        {
            name: "Total-profit",
            type: 'label',
            x: 100,
            y: 660,
            width: 550,
            height: 10,
            text: "Total profit: " + calculateTotalProfit(ride1)
        },
        {
            name: "Total-running-cost",
            type: 'label',
            x: 100,
            y: 680,
            width: 550,
            height: 10,
            text: "Total running cost: " + calculateTotalRunningCost(ride1)
        },
        {
            name: "removeRidesInGroup",
            type: "button",
            width: 30,
            height: 26,
            x: 250,
            y: 640,
            image: 5165,
            tooltip: "Remove all rides in this group",
            onClick: () => {
                for (const ride of ride1) {
                    let rideDemolishArgs: RideDemolishArgs = new ArgsRemove(ride.id, 0);
                    context.executeAction("ridedemolish", rideDemolishArgs, (result) => {
                        closeWindowShowStall();
                        console.log("RIDE IS REMOVED: ", result);
                    });
                }
            }
        },
        {
            name: 'MaintenanceIntervalLabel',
            type: 'label',
            x: 5,
            y: 710,
            width: 550,
            height: 20,
            text: "Maintenance interval: "
        },
        {
            name: 'MaintenanceInterval',
            type: 'dropdown',
            x: 140,
            y: 710,
            width: 150,
            height: 20,
            items: ["Every 10 minutes", "Every 20 minutes", "Every 30 minutes", "Every 45 minutes", "Every hour", "Every 2 hours", "Never"],
            selectedIndex: 0,
            onChange: (index) => {
                for (const element of ride1) {
                    element.inspectionInterval = index;
                }
                if (windowShowRide) {
                    windowShowRide.findWidget<DropdownWidget>('MaintenanceInterval').selectedIndex = index;
                }
            },
            tooltip: "Set the maintenance interval for all rides in this group. it is always set to 10 minutes by default in the dropdown. see the ridewindow for the actual value"
        }
    );

    return widgets;
}

function calculateCustomers(ride1: Ride[]) {
    let totalCustomers: number = 0;
    for (const element of ride1) {
        totalCustomers += element.totalCustomers;
    }
    return totalCustomers;
}

function calculateTotalProfit(ride1: Ride[]) {
    let totalProfit: number = 0;
    for (const element of ride1) {
        totalProfit += element.totalProfit;
    }
    totalProfit = totalProfit / 10;
    return totalProfit.toFixed(2);
}

function calculateTotalRunningCost(ride1: Ride[]) {
    let totalRunningCost: number = 0;
    for (const element of ride1) {
        if (element.runningCost > 0) {
            totalRunningCost += element.runningCost;
        }
    }
    totalRunningCost = totalRunningCost / 10;
    return totalRunningCost.toFixed(2);
}

export function setIndex(id: number) {
    index = id;
}