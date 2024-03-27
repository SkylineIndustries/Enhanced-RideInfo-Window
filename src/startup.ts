import { showWindowChooseGroup, setRides, getRides, setNames, getNames } from './window';
var saveData = context.getParkStorage();

export function startup()
{
	if (typeof ui !== "undefined")
	{
		ui.registerMenuItem("Enhanced-RideInfo-Window", () => showWindowChooseGroup());
		context.subscribe("map.save", () => {
			saveData.set("1", getRides())
			saveData.set("2", getNames())
		});

		if (saveData.has("1")) {
			var rides: any = saveData.get("1");
			var names: any = saveData.get("2");
			setRides(rides);
			setNames(names);
		}
	}
}