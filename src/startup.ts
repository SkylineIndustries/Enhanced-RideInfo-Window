import {showWindowChooseGroup} from "./v3.0.0/GroupEditorWindow/GroupEditorWindow";
import {getNames, getRides, Rides, setNames, setRides} from "./v3.0.0/GroupName/GroupName";
import {contextAction} from "./v3.0.0/HelperFuinction/ContextAction";

let saveData = context.getParkStorage();
type RidesId = [string, number[]];

export function startup() {
    console.log("Successfully loaded Enhanced Ride Info Window: CODEBASE CreditHunter");
	if (typeof ui !== "undefined") {
		ui.registerMenuItem("Enhanced-RideInfo-Window", () => showWindowChooseGroup());
        context.subscribe("map.save", () => {
            let rides: Rides[] = getRides();
            let ridesId: RidesId[] = rides.map(([key, rideArray]): RidesId => {
                const rideIds = rideArray.map(ride => ride.id);
                return [key, rideIds];
            });

            saveData.set("1", ridesId)
            saveData.set("2", getNames())
        });

        if (saveData.has("1")) {
            let rides: any = saveData.get("1");
            let names: any = saveData.get("2");

            let ridesArray: Rides[] = rides.map(([key, rideIds]: RidesId): Rides => {
                const rideArray = rideIds.map(rideId => map.getRide(rideId));
                return [key, rideArray];
            });

            let namesArray: string[] = names

            setRides(ridesArray);
            setNames(namesArray);
        }
        contextAction()
    }
}