import {BaseWindow} from "./BaseWindow";
import {WidgetFactory} from "../components/WidgetFactory";
import {getGroupNameBasedOmIndex} from "../../helpers/windows/renameGroupWindow/getGroupName";
import {processNameChange, setName} from "../../helpers/windows/renameGroupWindow/renameGroup";

export class RenameGroupWindow extends BaseWindow {

    override build(): WindowDesc {
        const width = 420;
        const height = 260;

        return {
            title: "Home",
            classification: this.windowTag,
            width,
            height,
            minWidth: 300,
            minHeight: 200,
            colours: [0o32, 0o30],
            widgets: [
                WidgetFactory.label((width - 200) / 2, (height - 20) / 2, 200, 20, getGroupNameBasedOmIndex(this.groupId!)),

                WidgetFactory.label(20, 165, 120, 20, "Group name"),
                WidgetFactory.textbox(140, 160, 200, 26, "groupName", "Enter group name", setName),

                WidgetFactory.button(
                    (width / 2) - 60,
                    200,
                    30,
                    26,
                    "cheats",
                    "Add Group",
                    "addGroup",
                    "Create the new group",
                    (): void => {
                        processNameChange(this.groupId!);
                    }
                ),
            ],
            onClose: (): void => {
                this.window = undefined;
            }
        };
    }
}
