/**
 * @packageDocumentation
 * Functions to create common widgets.
 * @module ui/windows/WidgetFactory
 */
export class WidgetFactory {
    static label(x: number, y: number, width: number, height: number, text: string): LabelDesc {
        return {
            height: height,
            isDisabled: false,
            isVisible: true,
            textAlign: "left",
            tooltip: "",
            width: width,
            type: "label",
            x,
            y,
            text,
            name: `label_${text.replace(/\s+/g, "_")}`};
    }

    static button(x: number, y: number, width: number, height: number,image: number | IconName, text: string, name: string, tooltip: string = '', onclick: () => void): ButtonDesc {
        return {
            height: height,
            isDisabled: false,
            isVisible: true,
            tooltip: tooltip,
            width: width,
            type: "button",
            image: image,
            border: true,
            isPressed: false,
            x,
            y,
            text,
            name: name,
            onClick: onclick,
        };
    }

    static dropdown(x: number, y: number, width: number, height: number,items: string[], selectedIndex: number, name: string, tooltip : string, onChange: (index: number) => void): DropdownDesc {
        return {
            height: height,
            isDisabled: false,
            isVisible: true,
            tooltip: tooltip,
            width: width,
            type: "dropdown",
            items: items,
            selectedIndex: selectedIndex,
            x,
            y,
            name: name,
            onChange: onChange,
        };
    }

    static listView(x: number, y: number, width: number, height: number, items: string[], name: string, tooltip: string, scrollbars: ScrollbarType, onClick: (index: number) => void): ListViewDesc {
        return {
            height: height,
            isDisabled: false,
            isVisible: true,
            tooltip: tooltip,
            width: width,
            type: "listview",
            items: items,
            x,
            y,
            name: name,
            scrollbars: scrollbars,
            onClick: onClick,
        };
    }

    static textbox(x: number, y: number, width: number, height: number, name: string, tooltip: string, onChange: (text: string) => void): TextBoxDesc {
        return {
            height: height,
            isDisabled: false,
            isVisible: true,
            tooltip: tooltip,
            width: width,
            type: "textbox",
            x,
            y,
            name: name,
            onChange: onChange,
        };
    }
}