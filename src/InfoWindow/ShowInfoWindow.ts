let emptyWindow: Window;
const windowTag = "Enhanced-RideInfo-Window";
let windowShowInfo: Window = ui.getWindow(windowTag);
export function showInfoWindow() {
    if (windowShowInfo) {
        windowShowInfo.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 400,
        height: 100,
        title: 'InfoWindow',
        colours: [0o32, 0o30],
        widgets: [
            {
                name: 'InfoText1',
                type: 'label',
                x: 5,
                y: 15,
                width: 750,
                height: 20,
                text: "This is Enhanced Ride Info version TrillTracker by SkylineIndustries \n" +
                    "This is a tool to help you keep track of your rides and groups \n" +
                    "You can create groups of rides and see the stats of the rides in the group \n\n\n" +
                    "Made by SkylineIndustries\n" +
                    "--Version 1.0.0 CodeBase TrillTracker--",
            }
        ],
        onClose() {
            windowShowInfo = emptyWindow;
            ui.tool?.cancel()
        },
        }
        windowShowInfo = ui.openWindow(windowDesc);
}

