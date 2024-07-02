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
		width: 670,
		height: 570,
		title: 'add new group',
		colours: [0o32, 0o30],
		widgets: createListviewWidget(),
		onClose() {
			windowAddGroup = emptyWindow;
		}
	}
	windowAddGroup = ui.openWindow(windowDesc);
}

export function createListviewWidget(): WidgetDesc[] {
	let rideNames: Ride[] = getAllRideNames();
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
                    showWindowError("Ride is already selected");
                    return;
                }
                rideIds.push(rideNames[index]);
                windowAddGroup.findWidget<ListViewWidget>('removeRide').items = rideIds.map(r => r.name);
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
            windowAddGroup.findWidget<ListViewWidget>('removeRide').items = rideIds.map(r => r.name);
        }
        },
		{
			name: "addGroup",
			type: "textbox",
			width: 100,
			height: 24,
			x: 5,
			y: 530,
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
			x: 120,
			y: 530,
			tooltip: "Create new group",
			onClick: () => {
                if (rideIds.length > 0 && groupName != "" && groupName != undefined && !checkGroupName(groupName)){
				addToGroup(rideIds);
				rideIds = []
				windowAddGroup.close();
                }
                else {
                    showWindowError("Group name is empty or group name is already exist or no rides selected")
                }
			},
			image: "cheats",
		}
	)
	return widgets
}

function getAllRideNames(): Ride[] {
    let nameRides: Ride[] = [];
	map.rides.sort((a, b) => a.name.localeCompare(b.name)).map(r => nameRides.push(r));

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