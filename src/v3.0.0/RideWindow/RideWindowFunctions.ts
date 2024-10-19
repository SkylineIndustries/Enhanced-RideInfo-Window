import {showWindowRide} from "./RideWindow";
import {showWindowStall} from "../StallWindow/StallWindow";

export function openRideWindow(item: Ride) {
    if (item.classification === "ride"){
        showWindowRide(item);
    }
    else{
        showWindowStall(item);
    }
}