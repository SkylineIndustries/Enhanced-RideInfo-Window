    import {WindowManager} from "./v5.0.0/ui/windows/WindowManager";

    export function startup() {

        if (typeof ui !== "undefined") {

            ui.registerMenuItem("Enhanced-RideInfo-Window", () => startup1());
        }
    }

    export function startup1() {
        // TEST: Wordt deze log getoond? Zo ja, dan is de fout de constructor.
        console.log("=== STARTUP FUNCTIE BEREIKT ===");

        // Verplaats de log vóór de HomeWindow instantie
        console.log('HELLO HI PRE-CONSTRUCTOR');

        WindowManager.openHome();

        console.log('HELLO HI POST-CONSTRUCTOR');
        // ...
    }