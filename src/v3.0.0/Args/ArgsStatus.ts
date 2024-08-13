class ArgsStatus {
    ride: number;
    status: number; // 0: closed, 1: open, 2: testing, 3: simulating

    constructor(ride: number, status: number){
        this.ride = ride;
        this.status = status;
    }
}