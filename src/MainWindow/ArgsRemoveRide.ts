export class ArgsRemoveRide {
    ride: number;
    modifyType: number;
    flags: number;

    constructor(ride: number, modifyType: number, flags: number) {
        this.ride = ride;
        this.modifyType = modifyType;
        this.flags = flags;
    }
}