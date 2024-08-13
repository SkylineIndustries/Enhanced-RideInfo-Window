import {ArgsName} from "../Args/ArgsName";
import { windowShowRide} from "./RideWindow";
import {windowShowStall} from "../StallWindow/StallWindow";

let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
let windowShowNameRide: Window = ui.getWindow(windowTag);

export function showWindowNameRide(ride: Ride) {
	let rideName: string;
	if (windowShowNameRide) {
		windowShowNameRide.bringToFront();
		return;
	}
	const windowDesc: WindowDesc = {
		classification: windowTag,
		width: 300,
		height: 80,
		title: 'Ride-Window ' + ride.name,
		colours: [0o32, 0o30],
		widgets: [
			{
				type: 'textbox',
				x: 5,
				y: 30,
				width: 200,
				height: 30,
				text: ride.name,
				onChange: (name: string) => {
					rideName = name;
				}
			},
			{
				name: 'ButtonSetName',
				type: 'button',
				x: 260,
				y: 30,
				width: 30,
				height: 30,
				image: 'copy',
				onClick: () => {
                    if (rideName == "") {
                        ui.showError("Error renaming ride name", "Ride name is empty")
                        return;
                    }
                    let rideSetNameArgs: RideSetNameArgs = new ArgsName(ride.id, rideName, 0);
					context.executeAction("ridesetname", rideSetNameArgs, (result) => {
						console.log("RIDE IS RENAMED: ", result);
					});
                    if (windowShowRide) {
                        windowShowRide.title = 'Ride-Window ' + rideName;
                    }
                    if (windowShowStall){
                        windowShowStall.title = 'Stall-Window ' + rideName;
                    }
                    windowShowNameRide.close();
				}
			}
		],
		onClose() {
			windowShowNameRide = emptyWindow;

			ui.tool?.cancel()
		},
	}
	windowShowNameRide = ui.openWindow(windowDesc);
	
}