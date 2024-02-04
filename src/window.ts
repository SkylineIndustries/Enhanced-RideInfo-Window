import { Group } from "./group"

let group: Group = new Group(["1", "2", "3"]);
let groups: string[] = group.getFirstId();
const windowTag = "Enhanced-RideInfo-Window";
let windowMain: Window = ui.getWindow(windowTag);
let windowChooseGroup: Window = ui.getWindow(windowTag);
let windowRemoveGuest: Window = ui.getWindow(windowTag);
let emptyWindow: Window;

export function showWindowChooseGroup(): void {
	if (windowChooseGroup) {
		windowChooseGroup.bringToFront();
		return;
	}
	const windowDesc: WindowDesc = {
		classification: windowTag,
		width: 550,
		height: 110,
		title: 'Enhanced-RideInfo-Window',
		colours: [],
		widgets: [
			{
				name: "allIds",
				type: "dropdown",
				width: 240,
				height: 10,
				x: 5,
				y: 20,
				tooltip: "Contains all the groups you made of the rides",
				items: groups
			}
		],
		onClose() {
			windowChooseGroup = emptyWindow;
		}
	}
	windowChooseGroup = ui.openWindow(windowDesc);
}