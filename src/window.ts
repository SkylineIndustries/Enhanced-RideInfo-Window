
let group: string[] = []
let groups: [string, string[]] = ["", []];
let names: string[] =[]
let rideIds: string[] = [];
const windowTag = "Enhanced-RideInfo-Window";
let windowMain: Window = ui.getWindow(windowTag);
let windowChooseGroup: Window = ui.getWindow(windowTag);
let windowAddGroup: Window = ui.getWindow(windowTag);
let emptyWindow: Window;
let groupName: string;
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
				items: names
			},
			{
				name: "addGroup",
				type: "button",
				width: 30,
				height:26,
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
		],
		onClose() {
			windowChooseGroup = emptyWindow;
		}
	}
	windowChooseGroup = ui.openWindow(windowDesc);
}
 function showWindowAddNewGroup(): void {
	if (windowAddGroup) {
		windowAddGroup.bringToFront();
		return;
	}
	 const windowDesc: WindowDesc = {
		 classification: windowTag,
		 width: 310,
		 height: 700,
		 title: 'add new group',
		 colours: [],
		 widgets: createCheckboxWidget(),
		onClose() {
			windowAddGroup = emptyWindow;
		}
	}
	 windowAddGroup = ui.openWindow(windowDesc);
}

function getAllRideNames(): string[] {
	var nameRides: Ride[] = [];
	map.rides.filter(r => r.classification === "ride").sort((a, b) => a.name.localeCompare(b.name)).map(r => nameRides.push(r));

	var nameOfRides: string[] = [];

	for (let i = 0; i < nameRides.length; i++) {
		var ride: Ride = nameRides[i];
		nameOfRides.push(ride.name)
	}
	return nameOfRides;
}

function createCheckboxWidget(): WidgetDesc[] {
	let rideNames: string[] = getAllRideNames()
	let height = 10;
	let widgets: WidgetDesc[] = [];

	for (let i = 0; i < rideNames.length; i++) {
		let widget: WidgetDesc = {
			name: "addGroup" + height,
			type: "checkbox",
			width: 24,
			height: 24,
			x: 5,
			y: height,
			tooltip: "Add to group",
			text: rideNames[i],
			onChange: () => {
				addToRideId(rideNames[i]);
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
			y: 24,
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
			y: 50,
			tooltip: "Create new group",
			onClick: () => {
				addToGroup(rideIds);
				windowAddGroup.close();
			},
			image: "cheats",
		}
	)
	return widgets
}

function addToRideId(id: string) {
	rideIds.push(id);
}

function addToGroup(ids: string[]) {
	group.length = 0
	for (let i = 0; i < ids.length; i++) {
		group.push(ids[i]);
	}
	names.push(groupName);
	groups.push(groupName, group.toString());
	windowChooseGroup = emptyWindow;
	showWindowChooseGroup();
}