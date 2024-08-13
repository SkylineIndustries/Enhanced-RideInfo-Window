import {ArgsRideName} from "../Args/ArgsRideName";
import {names, rides} from "../GroupName/GroupName";
import {showWindowViewGroup, windowViewGroup} from "../RideGroupWindow/RideGroupWindow";
import {reloadWindowShowStall, setOTCImageStall, windowShowStall} from "../StallWindow/StallWindow";
import {reloadWindowShowRide, ride1, setOTCImage, windowShowRide} from "../RideWindow/RideWindow";
import {ArgsRemoveRide} from "../Args/ArgsRemoveRide";

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
                if (args.setting == 5) {
                    windowShowRide.findWidget<SpinnerWidget>('maintenanceInterval').text = args.value.toString();
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