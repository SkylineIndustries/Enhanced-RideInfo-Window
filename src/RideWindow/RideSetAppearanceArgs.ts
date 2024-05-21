export class RideSetAppearanceArgs {
    ride: number;
    type: number; // see RideSetAppearanceType in openrct2/actions/RideSetAppearanceAction.h
    // value:
    // - if type is one of the track or vehicle colours: colour
    // - if type is VehicleColourScheme: 0: all same, 1: per train, 2: per car
    // - if type is EntranceStyle: entrance style
    // - if type is SellingItemColourIsRandom: 0: disabled, 1: enabled
    value: number;
    index: number;
    flags: number;

    constructor(ride: number, type: number, value: number, index: number, flags: number) {
        this.ride = ride;
        this.type = type;
        this.value = value;
        this.index = index;
        this.flags = flags;
    }


}