import { rides, names, showWindowAddNewGroup, createCheckboxWidget, } from "../RideListWindow/RideListWindow";
import { ArgsRideName } from "./ArgsRideName";
import { ArgsRemoveRide } from "./ArgsRemoveRide";

export { getNames, getRides, setNames, setRides } from "../RideListWindow/RideListWindow";
import { openRideWindow } from "../RideWindow/RideWindowFunctions"
import { reloadWindowShowRide, closeWindowShowRide } from "../RideWindow/RideWindow"

const windowTag = "Enhanced-RideInfo-Window";
let windowViewGroup: Window = ui.getWindow(windowTag);
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
		width: 150,
		height: 80,
		title: 'Enhanced-RideInfo-Window',
		colours: [],
		widgets: [
			{
				name: "allIds",
				type: "dropdown",
				width: 100,
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
					createCheckboxWidget(),
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
					names.splice(index);
					rides.splice(index);
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
					showWindowViewGroup()
				},
				image: "fast_forward",
			},
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
		colours: [],
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

	var listview: ListViewItem = ride;

	let widget: WidgetDesc = {
		name: "label" + height,
		type: "listview",
		width: 300,
		height: 600,
		x: 5,
		y: height,
		tooltip: "Open a ride",
		items: listview,
		canSelect: true,
		onClick: (item: number, column: number) => {
			openRideWindow(ride1[item])
		}
	};
	widgets.push(widget);
	return widgets;
}

export function contacxtAction() {
	context.subscribe("action.execute", (event) => {
		if (event.action == "ridesetname") {
			let args = event.args as ArgsRideName;

			for (let i = 0; i < rides.length; i++) {
				for (let j = 0; j < rides[i][1].length; j++) {
					if (rides[i][1][j].id === args.ride) {
						replaceNameInGroupWindow(rides[i][1][j])
						rides[i][1][j].name = args.name;
					}
				}
			}
			reloadWindowShowRide();
		}
		if (event.action == "ridedemolish") {
			let args = event.args as ArgsRemoveRide;

			for (let i = 0; i < rides.length; i++) {
				for (let j = 0; j < rides[i][1].length; j++) {
					if (rides[i][1][j].id === args.ride) {
						rides[i][1].splice(j, 1);
					}
					console.log(rides[i][0].length)
					if (rides[i][1].length == 0) {
						for (let k = 0; k < names.length; k++) {
							if (names[k] == rides[i][0]) {
								names.splice(k, 1)
								rides.splice(k, 1)
							}
						}
					}
				}
			}
			closeWindowShowRide();
		}
	})
}

function replaceNameInGroupWindow(ride: Ride) {

}