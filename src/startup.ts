import { showWindowChooseGroup, setRides, getRides, setNames, getNames, contextAction, Rides } from './MainWindow/window';
var saveData = context.getParkStorage();

export function startup() {
	if (typeof ui !== "undefined") {
		ui.registerMenuItem("Enhanced-RideInfo-Window", () => showWindowChooseGroup());
	}
}