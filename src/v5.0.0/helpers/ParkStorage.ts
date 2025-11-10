const saveData: Configuration = context.getParkStorage();

export function getAllGroups(): ridesList[] {
    return  saveData.get<ridesList[]>('rideGroups') || [];
}

export function saveAllGroups(groups: ridesList[]): void {
    saveData.set('rideGroups', groups);
}