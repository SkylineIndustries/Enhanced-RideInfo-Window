
export type Rides = [string, Ride[]];

export let rides: Rides[] = [];
export let names: string[] = []

export function setGroupName(index: number, name: string, oldName: string) {
    names[index] = name;

    for (const element of rides) {
        if (element[0] == oldName) {
            element[0] = name;
        }
    }
}

export function checkGroupName(name: string): boolean {
    for (const element of names) {
        if (element == name) {
            return true;
        }
    }
    return false;
}

export function getRides(): Rides[] {
    return rides;
}

export function getNames(): string[] {
    return names;
}

export function setRides(ride: Rides[]) {
    rides = ride;
}

export function setNames(name: string[]) {
    names = name;
}