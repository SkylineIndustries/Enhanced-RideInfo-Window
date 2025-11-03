export abstract class BaseWindow {
    
    protected window: Window | undefined;
    protected readonly tag: string;
    protected readonly title: string;
    protected readonly width: number;
    protected readonly height: number;
    protected readonly widgets: WidgetDesc[];
    protected readonly emptyWindow: Window | undefined;

    protected constructor(tag: string, title: string, width: number, height: number, widgets: WidgetDesc[]) {
        this.tag = tag;
        this.title = title;
        this.width = width;
        this.height = height;
        this.widgets = widgets;
        this.window = ui.getWindow(tag);
    }

    open(): void {
        if (this.window) {
            this.window.bringToFront();
            return;
        }

        const windowDesc: WindowDesc = {
            classification: this.tag,
            title: this.title,
            width: this.width,
            height: this.height,
            colours: [0o32, 0o30],
            widgets: this.widgets,
            onClose: () => {
                this.window = this.emptyWindow;
            }
        };
        this.window = ui.openWindow(windowDesc);
    }

    close(): void {
        this.window?.close();
    }
}
