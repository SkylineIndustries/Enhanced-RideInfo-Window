export class WidgetFactory {
    static createButton(config: {
        window: Window;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        tooltip?: string;
        isDisabled?: boolean;
        isVisible?: boolean;
        border?: boolean;
        image?: number | IconName;
        isPressed?: boolean;
        text?: string;
    }): ButtonWidget {
        return {
            window: config.window,
            type: "button",
            name: config.name,
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            tooltip: config.tooltip ?? "",
            isDisabled: config.isDisabled ?? false,
            isVisible: config.isVisible ?? true,
            border: config.border ?? true,
            image: config.image ?? 0,
            isPressed: config.isPressed ?? false,
            text: config.text ?? "",
        };
    }

    static createCheckbox(config: {
        window: Window;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        tooltip: string;
        text: string;
        isChecked?: boolean;
    }): CheckboxWidget {
        return {
            window: config.window,
            type: "checkbox",
            name: config.name,
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            tooltip: config.tooltip,
            isDisabled: false,
            isVisible: true,
            text: config.text,
            isChecked: config.isChecked ?? false,
        };
    }

    static createColourPicker(config: {
        window: Window;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        tooltip: string;
        colour: number;
    }): ColourPickerWidget {
        return {
            window: config.window,
            type: "colourpicker",
            name: config.name,
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            tooltip: config.tooltip,
            isDisabled: false,
            isVisible: true,
            colour: config.colour,
        };
    }

    static createDropdown(config: {
        window: Window;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        tooltip: string;
        items: string[];
        selectedIndex?: number;
    }): DropdownWidget {
        return {
            window: config.window,
            type: "dropdown",
            name: config.name,
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            tooltip: config.tooltip,
            isDisabled: false,
            isVisible: true,
            items: config.items,
            selectedIndex: config.selectedIndex ?? 0,
            text: config.items[config.selectedIndex ?? 0] || "",
        };
    }

    static createGroupBox(config: {
        window: Window;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        tooltip: string;
        text: string;
    }): GroupBoxWidget {
        return {
            window: config.window,
            type: "groupbox",
            name: config.name,
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            tooltip: config.tooltip,
            isDisabled: false,
            isVisible: true,
            text: config.text,
        };
    }

    static createLabel(config: {
        window: Window;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        tooltip: string;
        text: string;
        textAlign?: TextAlignment;
    }): LabelWidget {
        return {
            window: config.window,
            type: "label",
            name: config.name,
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            tooltip: config.tooltip,
            isDisabled: false,
            isVisible: true,
            text: config.text,
            textAlign: config.textAlign ?? "left",
        };
    }
    
    static createTextBox(config: {
        window: Window;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        tooltip: string;
        text: string;
        maxLength?: number;
    }): TextBoxWidget {
        return {
            window: config.window,
            type: "textbox",
            name: config.name,
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            tooltip: config.tooltip,
            isDisabled: false,
            isVisible: true,
            text: config.text,
            maxLength: config.maxLength ?? 0,
            focus () {}
        };
    }
}
    