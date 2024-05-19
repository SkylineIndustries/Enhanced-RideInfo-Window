
let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
let windowShowError: Window = ui.getWindow(windowTag);

export function showWindowError(errorMSG: string) {
    if (windowShowError) {
        windowShowError.bringToFront();
        return;
    }
    startIntervalTimer();
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 400,
        height: 80,
        title: 'Error',
        colours: [0o32, 0o30],
        widgets: [
            {
                type: 'label',
                x: 5,
                y: 15,
                width: 750,
                height: 20,
                text: errorMSG,
            },
            {
                name: 'ButtonError1',
                type: 'button',
                x: 5,
                y: 30,
                width: 30,
                height: 30,
                image: 'rct1_close_off',
            },
            {
                name: 'ButtonError2',
                type: 'button',
                x: 45,
                y: 30,
                width: 30,
                height: 30,
                image: 'rct1_close_off',
            },
            {
                name: 'ButtonError3',
                type: 'button',
                x: 85,
                y: 30,
                width: 30,
                height: 30,
                image: 'rct1_close_off',
            },
            {
                name: 'ButtonError4',
                type: 'button',
                x: 125,
                y: 30,
                width: 30,
                height: 30,
                image: 'rct1_close_off',
            },
            {
                name: 'ButtonError5',
                type: 'button',
                x: 165,
                y: 30,
                width: 30,
                height: 30,
                image: 'rct1_close_off',
            },
        ],
        onClose() {
            windowShowError = emptyWindow;
            ui.tool?.cancel()
        },
    }
    windowShowError = ui.openWindow(windowDesc);
}

function startIntervalTimer() {
    const duration = 5000; // duur in milliseconden
    const interval = 1000; // interval in milliseconden
    const endTime = Date.now() + duration;
    let index = 1;

    const intervalCallback = () => {
        // Actie uitvoeren bij elke interval
        windowShowError.findWidget<ButtonWidget>('ButtonError' + index).image = 'rct1_close_on';
        index++;

        // Controleren of de totale duur is bereikt
        if (Date.now() >= endTime) {
            // Actie uitvoeren wanneer de timer voltooid is
            windowShowError.close();
        } else {
            // Plan de volgende interval
            context.setTimeout(intervalCallback, interval);
        }
    };

    // Start de eerste interval
    context.setTimeout(intervalCallback, interval);
}