export class ArgsRideName {
    ride: number;
    name: string;
    flags: number;

    constructor(ride: number, name: string, flags: number) {
        this.ride = ride;
        this.name = name;
        this.flags = flags;
    }
}