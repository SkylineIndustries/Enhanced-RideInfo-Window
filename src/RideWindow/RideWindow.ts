import {ArgsRemove} from "../MainWindow/ArgsRemove";
import {showWindowNameRide} from "./SetNameWindow"
import {RideSetAppearanceArgs} from "./RideSetAppearanceArgs";
import {showWindowError} from "../ErrorWindow/ShowErrorWindow";
import {ViewportArray} from "./ViewportArray";

let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
export let windowShowRide: Window = ui.getWindow(windowTag);
let ride1: Ride;
let viewport: ViewportArray[] = [];
let selectedStation: number = 0;



export function showWindowRide(ride: Ride) {
	ride1 = ride;
    viewport = getAllVehiclesAndStations(ride1);
	if (windowShowRide) {
		windowShowRide.bringToFront();
		return;
	}
	const windowDesc: WindowDesc = {
		classification: windowTag,
		width: 400,
		height: 600,
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
                x: 5,
                y: 240,
                width: 550,
                height: 20,
                text: "lift hill speed: " + ride1.liftHillSpeed
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
				x: 120,
				y: 20,
				width: 250,
				height: 400,
				isVisible: true
			},
			{
				name: 'dropdownShowRide',
				type: 'dropdown',
                selectedIndex: 0,
				x: 120,
				y: 420,
				width: 250,
				height: 30,
                items: getStationNames(),
                onChange: (viewportNumber) => {
                    selectedStation = viewportNumber;
                    moveCamera(viewport[viewportNumber])
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
				x: 240,
				y: 455,
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
				x: 260,
				y: 455,
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
                name: 'ColorPickerTrack1',
                type: 'colourpicker',
                x: 300,
                y: 455,
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
                        showWindowError("Error setting colour, please try again.")
                        return
                    }
                }
            },
            {
                name: 'ColorPickerTrack2',
                type: 'colourpicker',
                x: 320,
                y: 455,
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
                        showWindowError("Error setting colour, please try again.")
                        return
                    }
                },
            },
            {
                name: 'ColorPickerTrack3',
                type: 'colourpicker',
                x: 340,
                y: 455,
                width: 10,
                height: 10,
                colour: ride.colourSchemes[0].supports,
                onChange: (colour) => {
                    try {
                        let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(ride.id, 0, colour, 2, 0);
                        context.executeAction("ridesetappearance", args, result => {
                            console.log(result)
                        })
                    }
                    catch (e) {
                        showWindowError("Error setting colour, please try again.")
                        return
                    }
                },
                tooltip: 'Supports'
            },
            {
                name: 'GoToSelectedRide',
                type: 'button',
                x: 355,
                y: 455,
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
            }
		],
		onClose() {
			windowShowRide = emptyWindow;

			ui.tool?.cancel()
		},
	}
	windowShowRide = ui.openWindow(windowDesc);
	moveCamera(new ViewportArray(ride1.stations[0].start, "Station 1"));
	setOTCImage(ride1.status);
}

function moveCamera(viewport: ViewportArray) {
    windowShowRide.findWidget<ViewportWidget>('viewportShowRide').viewport.moveTo(viewport.coordsXYZ)
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

function setOTCImage(status: string) {
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