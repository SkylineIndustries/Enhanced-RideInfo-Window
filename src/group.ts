export class Group {
    private rideId: string[] [] = [];

    public constructor(Id: string[]) {
        this.rideId.push(Id)
    }

    public getRideId(id: string): string[] {
        return this.rideId[id];
    }

    public getRideIds(): string[][] {
        return this.rideId;
    }

    public addNewGroup(rideId: string[]): void {
        this.rideId.push(rideId)
    }

    public getFirstId(): string[] {
        const firstId: string[] = [];

        for (const array of this.rideId) {
            if (array.length > 0) {
                firstId.push(array[0]);
            }
        }

        return firstId;
    }
}
