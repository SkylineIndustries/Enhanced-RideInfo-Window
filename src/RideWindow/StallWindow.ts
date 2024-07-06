import {showWindowNameRide} from "./SetNameWindow";
import {ArgsRemove} from "../MainWindow/ArgsRemove";
import {RideSetAppearanceArgs} from "./RideSetAppearanceArgs";

let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
export let windowShowStall: Window = ui.getWindow(windowTag);
let stall1: Ride;

export function showWindowStall(stall: Ride) {
    stall1 = stall;
    if (windowShowStall) {
        windowShowStall.bringToFront();
        return;
    }

    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 400,
        height: 460,
        title: 'Stall-Window ' + stall.name,
        colours: [0o32, 0o30],
        widgets: createStandardWidgets(stall).concat(setPriceWidgets(stall)).concat(setColorWidgets(stall)),
        onClose() {
            windowShowStall = emptyWindow;

            ui.tool?.cancel()
        },
    }
    windowShowStall = ui.openWindow(windowDesc);
    moveCamera(stall.stations[0].start);
    setOTCImageStall(stall.status);
}

function moveCamera(viewport: any) {
    windowShowStall.findWidget<ViewportWidget>('viewportShowRide').viewport.moveTo(viewport)
}

export function setOTCImageStall(status: string) {
    switch (status) {
        case "open":
            windowShowStall.findWidget<ButtonWidget>('ButtonShowStallOpen').image = 'rct1_open_on';
            windowShowStall.findWidget<ButtonWidget>('ButtonShowStallClose').image = 'rct1_close_off';
            break;

        case "closed":
            windowShowStall.findWidget<ButtonWidget>('ButtonShowStallOpen').image = 'rct1_open_off';
            windowShowStall.findWidget<ButtonWidget>('ButtonShowStallClose').image = 'rct1_close_on';
            break;
    }
}

function setColorWidgets(stall: Ride): WidgetDesc[] {
    let colorWidget: WidgetDesc[] = []
        colorWidget.push(
            {
                name: 'color',
                type: 'colourpicker',
                x: 5,
                y: 160,
                width: 100,
                height: 20,
                colour: stall.colourSchemes[0].main,
                tooltip: 'Change the colour of the ride (DOES NOTHING WHEN RIDE HOES NO ITEM TO CHANGE COLOUR OF)',
                onChange: (colour) => {
                    let args: RideSetAppearanceArgs = new RideSetAppearanceArgs(stall.id, 0, colour, 0, 0);
                    context.executeAction("ridesetappearance", args);
                }
            }
        )
        return colorWidget;
}
function setPriceWidgets(stall: Ride): WidgetDesc[] {

    if(stall.price[0] != null){
        let priceWidget: WidgetDesc[] = [];

        priceWidget.push(			{
            type: 'label',
            name: 'setPrice',
            x: 5,
            y: 80,
            width: 550,
            height: 10,
            text: "Ride price: "
        },)
        priceWidget.push(			{
            type: 'spinner',
            name: 'spinnerPrice',
            x: 5,
            y: 95,
            width: 100,
            height: 20,
            text: calculatePrice(stall.price[0]),
            onIncrement: () => windowShowStall.findWidget<SpinnerWidget>('spinnerPrice').text = setStallPrice(stall, "IN"),
            onDecrement: () => windowShowStall.findWidget<SpinnerWidget>('spinnerPrice').text = setStallPrice(stall, "DE")
        },)
        priceWidget.push({
          type: 'label',
          name: 'total-profit',
            x: 5,
            y: 120,
            width: 550,
            height: 10,
            text: "Total profit: " + calculatePrice(stall.totalProfit)
        })
        priceWidget.push(
            {
            type: 'label',
            name: 'running-cost',
            x: 5,
            y: 140,
            width: 550,
            height: 10,
            text: "Running cost: " + calculatePrice(stall.runningCost)
            }
        )
        return priceWidget
    }
    return [];
}

function createStandardWidgets(stall: Ride): WidgetDesc[] {
    let standardWidgets: WidgetDesc[] = [];
    standardWidgets.push(
    {
        name: 'viewportShowRide',
        type: 'viewport',
        x: 100,
        y: 20,
        width: 250,
        height: 400,
        isVisible: true
    },
    )
    standardWidgets.push(

        {
        name: 'ButtonShowStallOpen',
            type: 'button',
        x: 10,
        y: 20,
        width: 30,
        height: 30,
        image: 'rct1_open_off',
        onClick: () => {
        context.executeAction("ridesetstatus", { ride: stall.id, status: 1 })
        setOTCImageStall('open')
    }
    },
            {
        name: 'ButtonShowStallClose',
            type: 'button',
        x: 10,
        y: 60,
        width: 30,
        height: 30,
        image: 'rct1_close_off',
        onClick: () => {
        context.executeAction("ridesetstatus", { ride: stall.id, status: 0 })
        setOTCImageStall('closed')
    }
    },
        {
            name: 'Total-customers',
            type: 'label',
            x: 100,
            y: 430,
            width: 550,
            height: 10,
            text: "Total customers: " + stall.totalCustomers
        },
        {
            name: 'GoToSelectedRide',
            type: 'button',
            x: 10,
            y: 430,
            width: 30,
            height: 30,
            image: 'search',
            tooltip: 'Go to selected ride',
            onClick: () => {
                ui.mainViewport.moveTo(stall.stations[0].start)
            }
        },
        {
            name: 'ButtonShowRideName',
            type: 'button',
            x: 80,
            y: 430,
            width: 30,
            height: 30,
            image: 'copy',
            onClick: () => {
                showWindowNameRide(stall);
            }
        },
        {
            name: 'ButtonDeleteRide',
            type: 'button',
            x: 50,
            y: 430,
            width: 30,
            height: 30,
            image: 5165,
            onClick: () => {
                let rideDemolishArgs: RideDemolishArgs = new ArgsRemove(stall.id, 0);
                context.executeAction("ridedemolish", rideDemolishArgs, (result) => {
                    closeWindowShowStall();
                    console.log("RIDE IS REMOVED: ", result);
                });
            }
        },
    )
    return standardWidgets;
}

 function setStallPrice(stall: Ride, status: string) : string {
    let price: number = stall.price[0];
    if (status === 'IN' && price >=0 && price < 200) {
        price++;
    }
    else if (status === 'DE' && price > 0 && price <= 200){
        price--;
    }
    let priceDecimal: number = price / 10;
    let formattedPrice: string = priceDecimal.toFixed(2);
    context.executeAction("ridesetprice", { ride: stall.id, price: price, isPrimaryPrice: true });
    return formattedPrice;
}

function calculatePrice(price: number) {
    let totalProfit: number = price /10;
    return totalProfit.toFixed(2);
}

export function closeWindowShowStall() {
    windowShowStall.close();
}

export function reloadWindowShowStall() {
    windowShowStall.title = "Ride-Window " + stall1.name;
}