import {ArgsRemove} from "../Args/ArgsRemove";
import {showWindowNameRide} from "./SetNameWindow"
import {RideSetAppearanceArgs} from "../Args/RideSetAppearanceArgs";
import {ViewportArray} from "./ViewportArray";

let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
export let windowShowRide: Window = ui.getWindow(windowTag);
export let ride1: Ride;
let viewport: ViewportArray[] = [];
let selectedStation: number = 0;
let updateViewport: (IDisposable | null) = null;



export function showWindowRide(ride: Ride) {
	ride1 = ride;
    viewport = getAllVehiclesAndStations(ride1);
	if (windowShowRide) {
		windowShowRide.bringToFront();
		return;
	}

    const windowDesc: WindowDesc = {
		classification: windowTag,
		width: 475,
		height: 720,
		title: 'Ride-Window ' + ride1.name,
		colours: [0o32, 0o30],
		widgets: [
			{
				type: 'label',
				x: 5,
				y: 40,
				width: 550,
				height: 20,
				text: "Age: " + ride1.age,
			},
			{
				type: 'label',
				x: 5,
				y: 60,
				width: 550,
				height: 20,
				text: "Intensity: " + calculateIEN(ride1.intensity).toFixed(2)
			},
			{
				type: 'label',
				x: 5,
				y: 80,
				width: 550,
				height: 20,
				text: "Exciment: " + calculateIEN(ride1.excitement).toFixed(2)
			},
			{
				type: 'label',
				x: 5,
				y: 100,
				width: 550,
				height: 20,
				text: "Nausea: " + calculateIEN(ride1.nausea).toFixed(2)
			},
            {
                type: 'label',
                x: 5,
                y: 120,
                width: 550,
                height: 20,
                text: "Total customers: " + ride1.totalCustomers
            },
            {
                type: 'label',
                x: 5,
                y: 140,
                width: 550,
                height: 20,
                text: "Total profit: " + ride1.totalProfit
            },
            {
                type: 'label',
                x: 5,
                y: 160,
                width: 550,
                height: 20,
                text: "Downtime: " + ride1.downtime
            },
            {
                type: 'label',
                name: 'lifthill',
                x: 5,
                y: 240,
                width: 550,
                height: 20,
                text: "lift hill speed: " + ride1.liftHillSpeed
            },
            {
                name: 'RideSatisfaction',
                type: 'label',
                x: 5,
                y: 260,
                width: 550,
                height: 20,
                text: "Downtime: " + ride1.satisfaction
            },
            {
                name: 'MaxSpeed',
                type: 'label',
                x: 5,
                y: 280,
                width: 550,
                height: 20,
                text: "Max speed in MPH: " + ride1.maxSpeed
            },
            {
                name: 'AVGSpeed',
                type: 'label',
                x: 5,
                y: 300,
                width: 550,
                height: 20,
                text: "Avg speed in MPH: " + ride1.averageSpeed
            },
            {
                name: 'RideTime',
                type: 'label',
                x: 5,
                y: 320,
                width: 550,
                height: 20,
                text: "Ride time: " + ride1.rideTime
            },
            {
                name: 'RideLength',
                type: 'label',
                x: 5,
                y: 340,
                width: 550,
                height: 20,
                text: "Ride length: " + ride1.rideLength
            },
            {
                name: 'maxPositiveVerticalGs',
                type: 'label',
                x: 5,
                y: 360,
                width: 550,
                height: 20,
                text: "PvGs: " + ride1.maxPositiveVerticalGs
            },
            {
                name: 'maxNegativeVerticalGs',
                type: 'label',
                x: 5,
                y: 380,
                width: 550,
                height: 20,
                text: "NvGs: " + ride1.maxNegativeVerticalGs
            },
            {
                name: 'maxLateralGs',
                type: 'label',
                x: 5,
                y: 400,
                width: 550,
                height: 20,
                text: "Max lateral Gs: " + ride1.maxLateralGs
            },
            {
                name: 'numDrops',
                type: 'label',
                x: 5,
                y: 420,
                width: 550,
                height: 20,
                text: "Number of drops: " + ride1.numDrops
            },
            {
                name: 'highestDropHeight',
                type: 'label',
                x: 5,
                y: 440,
                width: 550,
                height: 20,
                text: "Highest drop height: " + ride1.highestDropHeight
            },
            {
                name: 'totalAirTime',
                type: 'label',
                x: 5,
                y: 460,
                width: 550,
                height: 20,
                text: "Total air time: " + ride1.totalAirTime
            },
			{
				type: 'label',
				name: 'test',
				x: 5,
				y: 520,
				width: 550,
				height: 20,
				text: "Minimun waiting time: "
			},
			{
				type: 'spinner',
				name: 'spinnerMinimun',
				x: 140,
				y: 520,
				width: 100,
				height: 20,
				text: ride1.minimumWaitingTime.toString(),
                onIncrement: () => {
                    if (ride1.minimumWaitingTime >= 0 && ride1.minimumWaitingTime < 250) {
                        let minWait: number = ride1.minimumWaitingTime + 1;
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMinimun').text = minWait.toString();
                        ride1.minimumWaitingTime = ride1.minimumWaitingTime + 1;
                    }
                    if (ride1.maximumWaitingTime <= ride1.minimumWaitingTime) {
                        ride1.maximumWaitingTime = ride1.minimumWaitingTime;
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMaximun').text = ride1.minimumWaitingTime.toString();
                    }
                },
                onDecrement: () => {
                    if (ride1.minimumWaitingTime > 0 && ride1.minimumWaitingTime <= 250) {
                        let minWait: number = ride1.minimumWaitingTime - 1;
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMinimun').text = minWait.toString();
                        ride1.minimumWaitingTime = ride1.minimumWaitingTime - 1;
                    }
                }
			},
			{
				type: 'label',
				name: 'test',
				x: 5,
				y: 540,
				width: 550,
				height: 20,
				text: "Minimun waiting time: "
			},
			{
				type: 'spinner',
				name: 'spinnerMaximun',
				x: 140,
				y: 540,
				width: 100,
				height: 20,
				text: ride1.maximumWaitingTime.toString(),
                onIncrement: () => {
                    if (ride1.maximumWaitingTime >= 0 && ride1.maximumWaitingTime < 250) {
                        let maxWait: number = ride1.maximumWaitingTime + 1;
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMaximun').text = maxWait.toString();
                        ride1.maximumWaitingTime = ride1.maximumWaitingTime + 1;
                    }
                },
                onDecrement: () => {
                    if (ride1.maximumWaitingTime > 0 && ride1.maximumWaitingTime <= 250) {
                        let maxWait: number = ride1.maximumWaitingTime - 1;
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMaximun').text = maxWait.toString();
                        ride1.maximumWaitingTime = ride1.maximumWaitingTime - 1;
                    }
                    if (ride1.maximumWaitingTime <= ride1.minimumWaitingTime) {
                        ride1.minimumWaitingTime = ride1.maximumWaitingTime;
                        windowShowRide.findWidget<SpinnerWidget>('spinnerMinimun').text = ride1.maximumWaitingTime.toString();
                    }
                }
			},
			{
				type: 'label',
				name: 'setPrice',
				x: 5,
				y: 560,
				width: 550,
				height: 20,
				text: "Ride price: "
			},
			{
				type: 'spinner',
				name: 'spinnerPrice',
				x: 140,
				y: 560,
				width: 100,
				height: 20,
				text: calculatePrice(ride1.price[0]),
				onIncrement: () => windowShowRide.findWidget<SpinnerWidget>('spinnerPrice').text = setRidePrice(ride1, "IN"),
				onDecrement: () => windowShowRide.findWidget<SpinnerWidget>('spinnerPrice').text = setRidePrice(ride1, "DE")

			},
			{
				name: 'viewportShowRide',
				type: 'viewport',
				x: 140,
				y: 20,
				width: 250,
				height: 400,
				isVisible: true
			},
			{
				name: 'dropdownShowRide',
				type: 'dropdown',
                selectedIndex: 0,
				x: 140,
				y: 420,
				width: 250,
				height: 30,
                items: getStationNames(),
                onChange: (viewportNumber) => {
                    moveCamera(viewportNumber)
                }
                },
			{
				name: 'ButtonShowRideOpen',
				type: 'button',
				x: 120,
				y: 455,
				width: 30,
				height: 30,
				image: 'rct1_open_off',
				onClick: () => {
					context.executeAction("ridesetstatus", { ride: ride1.id, status: 1 })
					setOTCImage('open')
				}
			},
			{
				name: 'ButtonShowRideTest',
				type: 'button',
				x: 160,
				y: 455,
				width: 30,
				height: 30,
				image: 'rct1_test_off',
				onClick: () => {
					context.executeAction("ridesetstatus", { ride: ride1.id, status: 2 })
					setOTCImage('test')


				}
			},
			{
				name: 'ButtonShowRideClose',
				type: 'button',
				x: 200,
				y: 455,
				width: 30,
				height: 30,
				image: 'rct1_close_off',
				onClick: () => {
					context.executeAction("ridesetstatus", { ride: ride1.id, status: 0 })
					setOTCImage('closed')
				}
			},
			{
				name: 'ButtonShowRideName',
				type: 'button',
				x: 120,
				y: 490,
				width: 30,
				height: 30,
				image: 'copy',
				onClick: () => {
					showWindowNameRide(ride1);
				}
			},
			{
				name: 'ButtonDeleteRide',
				type: 'button',
				x: 160,
				y: 490,
				width: 30,
				height: 30,
				image: 5165,
				onClick: () => {
                    let rideDemolishArgs: RideDemolishArgs = new ArgsRemove(ride.id, 0);
					context.executeAction("ridedemolish", rideDemolishArgs, (result) => {
						closeWindowShowRide()
						console.log("RIDE IS REMOVED: ", result);
					});
				}
			},
            {
                name: 'LabelColorSettings',
                type: 'label',
                x: 310,
                y: 530,
                width: 550,
                height: 20,
                text: "<-- Track color settings"
            },
            {
                name: 'ColorPickerTrack1',
                type: 'colourpicker',
                x: 250,
                y: 530,
                width: 10,
                height: 10,
                colour: ride.colourSchemes[0].main,
                tooltip: 'Main',
                onChange: (colour) => {
                    try {
                        let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(ride.id, 0, colour, 0, 0);
                        context.executeAction("ridesetappearance", args, result => {
                            console.log(result)
                        })
                    }
                    catch (e) {
                        ui.showError("Error setting colour", "Error setting colour, please try again.")
                        return
                    }
                }
            },
            {
                name: 'ColorPickerTrack2',
                type: 'colourpicker',
                x: 270,
                y: 530,
                width: 10,
                height: 10,
                colour: ride.colourSchemes[0].additional,
                tooltip: 'Additional',
                onChange: (colour) => {
                    try {
                        let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(ride.id, 1, colour, 0, 0);
                        context.executeAction("ridesetappearance", args, result => {
                            console.log(result)
                        })
                    }
                    catch (e) {
                        ui.showError("Error setting colour", "Error setting colour, please try again.")
                        return
                    }
                },
            },
            {
                name: 'ColorPickerTrack3',
                type: 'colourpicker',
                x: 290,
                y: 530,
                width: 10,
                height: 10,
                colour: ride.colourSchemes[0].supports,
                onChange: (colour) => {
                    try {
                        let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(ride.id, 2, colour, 0, 0);
                        context.executeAction("ridesetappearance", args, result => {
                            console.log(result)
                        })
                    }
                    catch (e) {
                        ui.showError("Error setting colour", "Error setting colour, please try again.")
                        return
                    }
                },
                tooltip: 'Supports'
            },
            {
                name: 'LabelVehicleColorSettings',
                type: 'label',
                x: 310,
                y: 550,
                width: 550,
                height: 20,
                text: "<-- Vehicle color settings"
            },
            {
                name: 'ColorPickerVehicle1',
                type: 'colourpicker',
                x: 250,
                y: 550,
                width: 10,
                height: 10,
                colour: ride.vehicleColours[0].body,
                tooltip: 'Main',
                onChange: (colour) => {
                    try {
                        let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(ride.id, 3, colour, 0, 0);
                        context.executeAction("ridesetappearance", args, result => {
                            console.log(result)
                        })
                    }
                    catch (e) {
                        ui.showError("Error setting colour", "Error setting colour, please try again.")
                        return
                    }
                }
            },
            {
                name: 'ColorPickerVehicle2',
                type: 'colourpicker',
                x: 270,
                y: 550,
                width: 10,
                height: 10,
                colour: ride.vehicleColours[0].trim,
                tooltip: 'Additional',
                onChange: (colour) => {
                    try {
                        let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(ride.id, 4, colour, 0, 0);
                        context.executeAction("ridesetappearance", args, result => {
                            console.log(result)
                        })
                    }
                    catch (e) {
                        ui.showError("Error setting colour", "Error setting colour, please try again.")
                        return
                    }
                },
            },
            {
                name: 'ColorPickerVehicle3',
                type: 'colourpicker',
                x: 290,
                y: 550,
                width: 10,
                height: 10,
                colour: ride.vehicleColours[0].tertiary,
                onChange: (colour) => {
                    try {
                        let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(ride.id, 5, colour, 0, 0);
                        context.executeAction("ridesetappearance", args, result => {
                            console.log(result)
                        })
                    }
                    catch (e) {
                        ui.showError("Error setting colour", "Error setting colour, please try again.")
                        return
                    }
                },
                tooltip: 'Supports'
            },
            {
                name: 'GoToSelectedRide',
                type: 'button',
                x: 200,
                y: 490,
                width: 30,
                height: 30,
                image: 'search',
                tooltip: 'Go to selected ride',
                onClick: () => {
                ui.mainViewport.moveTo(ride1.stations[selectedStation].start)
                }
            },
            {
                name: 'TotalGuests',
                type: 'label',
                x: 5,
                y: 180,
                width: 550,
                height: 10,
                text: "Total customers: " + ride1.totalCustomers
            },
            {
                name: 'TotalProfit',
                type: 'label',
                x: 5,
                y: 200,
                width: 550,
                height: 10,
                text: "Total profit: " + calculatePrice(ride1.totalProfit)
            },
            {
                name: 'RunningCost',
                type: 'label',
                x: 5,
                y: 220,
                width: 550,
                height: 10,
                text: "Running cost: " + calculatePrice(ride1.runningCost)
            },
            {
                name: 'MaintenanceIntervalLabel',
                type: 'label',
                x: 5,
                y: 580,
                width: 550,
                height: 20,
                text: "Maintenance interval: "
            },
            {
                name: 'MaintenanceInterval',
                type: 'dropdown',
                x: 140,
                y: 580,
                width: 150,
                height: 20,
                items: ["Every 10 minutes", "Every 20 minutes", "Every 30 minutes", "Every 45 minutes", "Every hour", "Every 2 hours", "Never"],
                selectedIndex: ride1.inspectionInterval,
                onChange: (index) => {
                    ride1.inspectionInterval = index;
                },
            },
            {
                name: 'StationStyleLabel',
                type: 'label',
                x: 5,
                y: 600,
                width: 550,
                height: 20,
                text: "Station style: "
            },
            {
                name: 'StationStyleDropdown',
                type: 'dropdown',
                x: 140,
                y: 600,
                width: 150,
                height: 20,
                items: ["Plain", "Wooden","Canvas Tent","Castle [Gray]","Castle [Brown]", "Jungle", "Log Cabin"," Classical/Roman","Abstract", "Snow/Ice","Pagoda","Space"],
                selectedIndex: ride1.stationStyle,
                onChange: (index) => {
                    ride1.stationStyle = index;
                },
            },
            {
                name: 'LifthillSpeedLabel',
                type: 'label',
                x: 5,
                y: 620,
                width: 550,
                height: 20,
                text: "Lift hill speed in MPH: "
            },
            {
                type: 'spinner',
                name: 'spinnerLiftHillSpeed',
                x: 140,
                y: 620,
                width: 100,
                height: 20,
                text: ride1.liftHillSpeed.toString(),
                onIncrement: () => windowShowRide.findWidget<SpinnerWidget>('spinnerLiftHillSpeed').text = setLiftHillSpeed(ride1, "IN"),
                onDecrement: () => windowShowRide.findWidget<SpinnerWidget>('spinnerLiftHillSpeed').text = setLiftHillSpeed(ride1, "DE")
            },
		],
		onClose() {
            if (updateViewport != null) {
                disableUpdateViewport();
            }
            windowShowRide = emptyWindow;
            ui.tool?.cancel()
		},
	}
	windowShowRide = ui.openWindow(windowDesc);
    windowShowRide.findWidget<ViewportWidget>('viewportShowRide').viewport.moveTo(ride1.stations[0].start)
    setOTCImage(ride1.status);
}

function moveCamera(viewportNumber: number) {
    if (updateViewport != null) {
        disableUpdateViewport();
    }
    if (viewport[viewportNumber].stationName.includes("Vehicle")) {
        followTrain(viewportNumber);
    }
    else {
        windowShowRide.findWidget<ViewportWidget>('viewportShowRide').viewport.moveTo(viewport[viewportNumber].coordsXYZ)
    }
}

export function setRidePrice(ride: Ride, status: string) : string {
    if (!park.getFlag("freeParkEntry") && !park.getFlag("unlockAllPrices")){
        return "0.00";
    }
	let price: number = ride.price[0];
	if (status === 'IN' && price >=0 && price < 200) {
		price++;
	}
	else if (status === 'DE' && price > 0 && price <= 200){
		price--;
	}
    let priceDecimal: number = price / 10;
    let formattedPrice: string = priceDecimal.toFixed(2);
	context.executeAction("ridesetprice", { ride: ride.id, price: price, isPrimaryPrice: true });
    return formattedPrice;
}

export function setOTCImage(status: string) {
	switch (status) {
		case "open":
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideTest').image = 'rct1_test_off';
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideOpen').image = 'rct1_open_on';
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideClose').image = 'rct1_close_off';
			break;

		case "test":
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideTest').image = 'rct1_test_on';
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideOpen').image = 'rct1_open_off';
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideClose').image = 'rct1_close_off';
			break;

		case "closed":
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideTest').image = 'rct1_test_off';
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideOpen').image = 'rct1_open_off';
			windowShowRide.findWidget<ButtonWidget>('ButtonShowRideClose').image = 'rct1_close_on';
			break;
	}
}

export function closeWindowShowRide() {
	windowShowRide.close();
}

export function reloadWindowShowRide() {
	windowShowRide.title = "Ride-Window " + ride1.name;
}

function calculateIEN(value: number) {
    return value /100;
}

function getAllVehiclesAndStations(ride1: Ride) {
    viewport = [];
    let  id: number = 1;
    for (const element of ride1.stations) {
        if (element.start != null){
            let viewportObject: ViewportArray = new ViewportArray(element.start, "Station " + id);
            viewport.push(viewportObject);
            id++;
        }
    }
    id = 1;
    for (const element of ride1.vehicles) {
        if (element != null) {
            if (map.getEntity(element) != null) {
                let vehicle: CoordsXYZ = {
                    x: map.getEntity(element).x,
                    y: map.getEntity(element).y,
                    z: map.getEntity(element).z
                }
                let viewportObject: ViewportArray = new ViewportArray(vehicle, "Vehicle " + id);
                viewportObject.setVehicleNumber(element);
                viewport.push(viewportObject);
                id++;
            }
        }
    }
    return viewport;
}

export function calculatePrice(price: number) {
    let totalProfit: number = price /10;
    return totalProfit.toFixed(2);
}

function getStationNames() {
    let stationNames: string[] = [];
   for(const element of viewport) {
       stationNames.push(element.stationName);
    }
    return stationNames;
}

function followTrain(viewportNumber: number) {
     updateViewport = context.subscribe("interval.tick",() => {
         let element: number = viewport[viewportNumber].getVehicleNumber();
         let vehicle: CoordsXYZ = {
             x: map.getEntity(element).x,
             y: map.getEntity(element).y,
             z: map.getEntity(element).z
         }
         windowShowRide.findWidget<ViewportWidget>('viewportShowRide').viewport.moveTo(vehicle)
     })
}

function disableUpdateViewport(){
    updateViewport?.dispose();
    updateViewport = null;
}


function setLiftHillSpeed(ride1: Ride, in1: string) : string {

    let speed: number = ride1.liftHillSpeed;

    if (in1 === 'IN' && speed >= ride1.minLiftHillSpeed && speed < ride1.maxLiftHillSpeed) {
        speed++;
    }
    else if (in1 === 'DE' && speed > ride1.minLiftHillSpeed && speed <= ride1.maxLiftHillSpeed) {
        speed--;
    }
    context.executeAction("ridesetsetting", { ride: ride1.id, setting: 8, value: speed, flags: 0 });
    return speed.toString();
}
