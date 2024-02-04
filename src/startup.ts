import { showWindowChooseGroup } from './window';

export function startup()
{
	if (typeof ui !== "undefined")
	{
		ui.registerMenuItem("Enhanced-RideInfo-Window", () => showWindowChooseGroup());

	}
}