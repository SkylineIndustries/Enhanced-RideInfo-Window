import {createListviewWidget, names, rides, showWindowAddNewGroup,} from "../RideListWindow/RideListWindow";
import {ArgsRideName} from "./ArgsRideName";
import {ArgsRemoveRide} from "./ArgsRemoveRide";
import {openRideWindow} from "../RideWindow/RideWindowFunctions"
import {reloadWindowShowRide, ride1, setOTCImage, windowShowRide} from "../RideWindow/RideWindow"
import {showWindowRenameGroup} from "./ShowWindowRenameGroup";
import {showWindowError} from "../ErrorWindow/ShowErrorWindow";
import {showInfoWindow} from "../InfoWindow/ShowInfoWindow";
import {closeWindowShowStall, reloadWindowShowStall, windowShowStall} from "../RideWindow/StallWindow";
import {ArgsRemove} from "./ArgsRemove";
import {RideSetAppearanceArgs} from "../RideWindow/RideSetAppearanceArgs";
import {setOTCImageStall} from "../RideWindow/StallWindow";
export { getNames, getRides, setNames, setRides, Rides } from "../RideListWindow/RideListWindow";

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
            text: "Total running cost: " + caluclateTotalRunningCost(ride1)
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
        );

	return widgets;
}

export function contextAction() {
	context.subscribe("action.execute", (event) => {
        if (event.action == "") {}
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
            reloadWindowShowStall();
			reloadWindowShowRide();
            showWindowViewGroup();
		}
        if (event.action == "ridesetsetting") {
            let args = event.args as ArgsSetting;
            if (windowShowRide) {
                if (args.setting == 2) {
                    windowShowRide.findWidget<SpinnerWidget>('spinnerMinimun').text = args.value.toString();
                    if (ride1.maximumWaitingTime <= ride1.minimumWaitingTime) {
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMaximun').text = args.value.toString();
                    }
                }

                if (args.setting == 3) {
                    windowShowRide.findWidget<SpinnerWidget>('spinnerMaximun').text = args.value.toString();
                    if (ride1.maximumWaitingTime <= ride1.minimumWaitingTime) {
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMinimun').text = args.value.toString();
                    }
                }
                if (args.setting == 4) {
                    windowShowRide.findWidget<SpinnerWidget>('spinnerPrice').text = args.value.toString();

                }
                if (args.setting == 8) {
                    windowShowRide.findWidget<LabelWidget>('lifthill').text = args.value.toString();
                }
            }
        }
        if (event.action == "ridesetprice") {
            if (windowShowStall) {
                let args = event.args as ArgsPrice;
                let priceDecimal: number = args.price / 10;
                windowShowStall.findWidget<SpinnerWidget>('spinnerPrice').text = priceDecimal.toFixed(2);
            }
            if (windowShowRide) {
                let args = event.args as ArgsPrice;
                let priceDecimal: number = args.price / 10;
                windowShowRide.findWidget<SpinnerWidget>('spinnerPrice').text = priceDecimal.toFixed(2);
            }
        }
        if (event.action == "ridesetstatus") {
            if (windowShowStall) {
                let args = event.args as ArgsStatus;
                if (args.status == 1) {
                    setOTCImageStall("open");
                }
                if (args.status == 0) {
                    setOTCImageStall("closed");
                }
            }
            if (windowShowRide) {
                let args = event.args as ArgsStatus;
                if (args.status == 1) {
                    setOTCImage("open");
                }
                if (args.status == 0) {
                    setOTCImage("closed");
                }
                if (args.status == 2) {
                    setOTCImage("test");
                }
            }
        }
        if (event.action == "ridesetappearance") {
            if (windowShowStall){
                let args = event.args as RideSetAppearanceArgs;
                if (args.type == 0){
                    windowShowStall.findWidget<ColourPickerWidget>('color').colour = args.value;
                }
            }
            if (windowShowRide) {
                let args = event.args as RideSetAppearanceArgs;
                if (args.type == 0) {
                    windowShowRide.findWidget<ColourPickerWidget>('ColorPickerTrack1').colour =args.value;
                }
                if (args.type == 1){
                    windowShowRide.findWidget<ColourPickerWidget>('ColorPickerTrack2').colour =args.value;
                }
                if (args.type == 2){
                    windowShowRide.findWidget<ColourPickerWidget>('ColorPickerTrack3').colour =args.value;
                }
                if (args.type == 3){
                    windowShowRide.findWidget<ColourPickerWidget>('ColorPickerVehicle1').colour =args.value;
                }
                if (args.type == 4){
                    windowShowRide.findWidget<ColourPickerWidget>('ColorPickerVehicle2').colour =args.value;
                }
                if (args.type == 5){
                    windowShowRide.findWidget<ColourPickerWidget>('ColorPickerVehicle3').colour =args.value;
                }
            }
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

function caluclateTotalRunningCost(ride1: Ride[]) {
    let totalRunningCost: number = 0;
    for (const element of ride1) {
        totalRunningCost += element.runningCost;
    }
    totalRunningCost = totalRunningCost / 10;
    return totalRunningCost.toFixed(2);
}