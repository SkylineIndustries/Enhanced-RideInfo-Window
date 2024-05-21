import {rides, names, showWindowAddNewGroup, createListviewWidget,} from "../RideListWindow/RideListWindow";
import { ArgsRideName } from "./ArgsRideName";
import { ArgsRemoveRide } from "./ArgsRemoveRide";

export { getNames, getRides, setNames, setRides, Rides } from "../RideListWindow/RideListWindow";
import { openRideWindow } from "../RideWindow/RideWindowFunctions"
import {reloadWindowShowRide, windowShowRide} from "../RideWindow/RideWindow"
import {showWindowRenameGroup} from "./ShowWindowRenameGroup";
import {showWindowError} from "../ErrorWindow/ShowErrorWindow";
import {showInfoWindow} from "../InfoWindow/ShowInfoWindow";

const windowTag = "Enhanced-RideInfo-Window";
export let windowViewGroup: Window = ui.getWindow(windowTag);
let windowChooseGroup: Window = ui.getWindow(windowTag);
let emptyWindow: Window;
let index: number = 0;

export function showWindowChooseGroup(): void {
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
                        showWindowError("No group to remove")
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
                        showWindowError("No group to open")
                        return;
                    }
					showWindowViewGroup()
                    windowChooseGroup.close()
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
                        showWindowError("No group to rename")
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



function showWindowViewGroup(): void {
	if (windowViewGroup) {
		windowViewGroup.bringToFront();
		return;
	}
	const windowDesc: WindowDesc = {
		classification: windowTag,
		width: 310,
		height: 700,
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

	let widget: WidgetDesc = {
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
	};
	widgets.push(widget);
	return widgets;
}

export function contextAction() {
	context.subscribe("action.execute", (event) => {
		if (event.action == "ridesetname") {
			let args = event.args as ArgsRideName;

			for (const element of rides) {
                for (let j = 0; j < element[1].length; j++) {
                    if (element[1][j].id === args.ride) {
                        element[1][j].name = args.name;
                    }
				}
			}
            windowViewGroup.close()
			reloadWindowShowRide();
            showWindowViewGroup();
		}
		if (event.action == "ridedemolish") {
			let args = event.args as ArgsRemoveRide;

			for (const element of rides) {
                for (let j = 0; j < element[1].length; j++) {
                    if (element[1][j].id === args.ride) {
                        element[1].splice(j, 1);
                    }
                    if (element[1].length == 0) {
                        for (let k = 0; k < names.length; k++) {
                            if (names[k] == element[0]) {
								names.splice(k, 1)
								rides.splice(k, 1)
							}
						}
					}
                    if (element[1].length == 0) {
                        windowViewGroup.close()
                        return;
                    }
				}
			}
            windowViewGroup.close();
            windowShowRide.close();
            showWindowViewGroup();
		}
        })
}

export function setGroupName(index: number, name: string, oldName: string) {
    names[index] = name;

    for (const element of rides) {
        if (element[0] == oldName) {
            element[0] = name;
        }
    }
}
export function checkGroupName(name: string): boolean {
    for (const element of names) {
        if (element == name) {
            return true;
        }
    }
    return false;
}