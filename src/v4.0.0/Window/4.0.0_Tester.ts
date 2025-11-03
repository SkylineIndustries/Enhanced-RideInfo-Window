import {ChooseGroupWindow} from "./ChooseGroupWindow";

export function test() {
    let window: ChooseGroupWindow = ChooseGroupWindow.getInstance();
    window.open();
}