import {checkGroupName, showWindowChooseGroup} from "../MainWindow/window";
import {showWindowError} from "../ErrorWindow/ShowErrorWindow";


export type Rides = [string, Ride[]];

let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
let windowAddGroup: Window = ui.getWindow(windowTag);

let groupName: string;
export let rides: Rides[] = [];
export let names: string[] = []

export function showWindowAddNewGroup(): void {
	if (windowAddGroup) {
		windowAddGroup.bringToFront();
		return;
	}
	const windowDesc: WindowDesc = {
		classification: windowTag,
		width: 700,
		height: 850,
		title: 'add new group',
		colours: [0o32, 0o30],
		widgets: createCheckboxWidget(),
		onClose() {
			windowAddGroup = emptyWindow;
		}
	}
	windowAddGroup = ui.openWindow(windowDesc);
}

export function createCheckboxWidget(): WidgetDesc[] {
	let rideNames: Ride[] = getAllRideNames();
	let rideIds: Ride[] = [];
	let height = 10;
	let x = 5;
	let widgets: WidgetDesc[] = [];

	for (let i = 0; i < rideNames.length; i++) {
		if (i % 60 == 0 && i != 0) {
			x = x + 130
			height = 10;
		}
		let widget: WidgetDesc = {
			name: "addGroup" + i,
			type: "checkbox",
			width: 24,
			height: 24,
			x: x,
			y: height,
			tooltip: "Add to group",
			text: rideNames[i].name,
			onChange: () => {
				if (rideIds.indexOf(rideNames[i]) !== -1) {
					let index = (rideIds.indexOf(rideNames[i]));
					rideIds.splice(index, 1);
				}
				else {
					rideIds.push(rideNames[i])
				}
			}
		};
		height += 10;
		widgets.push(widget);
	}
	widgets.push(
		{
			name: "addGroup",
			type: "textbox",
			width: 100,
			height: 24,
			x: 200,
			y: 624,
			tooltip: "Create new group",
			onChange: (name: string) => {
				groupName = name;
			}
		},
		{
			name: "addGroup",
			type: "button",
			width: 30,
			height: 26,
			x: 200,
			y: 650,
			tooltip: "Create new group",
			onClick: () => {
                if (rideIds.length > 0 && groupName != "" && groupName != undefined && !checkGroupName(groupName)){
				addToGroup(rideIds);
				rideIds = []
				windowAddGroup.close();
                }
                else {
                    showWindowError("Group name is empty or group name is already exist or no rides selected")
                    console.log("GROUP NAME IS NULL OR GROUP NAME IS ALREADY EXIST OR NO RIDES SELECTED")
                }
			},
			image: "cheats",
		}
	)
	return widgets
}

function getAllRideNames(): Ride[] {
    let nameRides: Ride[] = [];
	map.rides.filter(r => r.classification === "ride").sort((a, b) => a.name.localeCompare(b.name)).map(r => nameRides.push(r));

    let nameOfRides: Ride[] = [];
	for (const element of nameRides) {
        nameOfRides.push(element)
	}

	return nameRides;
}

function addToGroup(ids: Ride[]) {
	names.push(groupName)
	rides.push([groupName, ids])
	showWindowChooseGroup();
}

export function setRides(ridesNew: Rides[]) {
	rides = ridesNew;
}

export function getRides(): Rides[] {
	return rides;
}
export function getNames(): string[] {
	return names;
}
export function setNames(namesNew: string[]) {
	names = namesNew;
}