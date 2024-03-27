type Rides = [string, string[]];
let rides: Rides[] = [];
let names: string[] = []


const windowTag = "Enhanced-RideInfo-Window";
let windowViewGroup: Window = ui.getWindow(windowTag);
let windowChooseGroup: Window = ui.getWindow(windowTag);
let windowAddGroup: Window = ui.getWindow(windowTag);
let emptyWindow: Window;
let groupName: string;
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
			{
				name: "removeGroup",
				type: "button",
				width: 30,
				height: 26,
				x: 40,
				y: 40,
				tooltip: "Remove group",
				onClick: () => {
				},
				image: 5165,
			},
			{
				name: "removeGroup",
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
	let rideNames: string[] = getAllRideNames();
	let rideIds: string[] = [];
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
				rideIds = []
				windowAddGroup.close();
			},
			image: "cheats",
		}
	)
	return widgets
}

function addToGroup(ids: string[]) {
	names.push(groupName)
	rides.push([groupName, ids])
	
	showWindowChooseGroup();
}

function getAllRidesOfAGroup(id: number): WidgetDesc[] {
	let height = 30;
	let widgets: WidgetDesc[] = [];
	let ride: string[] = [];

	ride.push(...rides[id][1])

	for (let i = 0; i < ride.length; i++) {
			let widget: WidgetDesc = {
				name: "label" + height,
				type: "label",
				width: 500,
				height: 24,
				x: 15,
				y: height,
				tooltip: "Add to group",
				text: ride[i],
		};
			height += 10;
			widgets.push(widget);
		}
		return widgets;
}