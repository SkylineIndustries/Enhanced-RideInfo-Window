/**
 * @packageDocumentation
 * Base class for creating and managing UI windows.
 * @module ui/components/BaseWindow
 */
export abstract class BaseWindow {
    protected window?: Window;
    protected windowTag: string;

    constructor(windowTag: string) {
        this.windowTag = windowTag;
    }

    abstract build(window?: Window): WindowDesc;

    show(): void {

        this.window = ui.getWindow(this.windowTag)

        if (this.window) {
            this.window.bringToFront();
            return;
        }

        const desc: WindowDesc = this.build(this.window);

        this.window = ui.openWindow(desc);
    }

    close(): void {
        if (this.window) this.window.close();
        this.window = undefined;
    }
}