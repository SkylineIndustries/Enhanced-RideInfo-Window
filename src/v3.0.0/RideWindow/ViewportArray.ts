export class ViewportArray {
     coordsXYZ: CoordsXYZ

    stationName: string

    vehicleNumber: number = -100000000000000000
    constructor(coordsXYZ: CoordsXYZ, stationName: string) {
        this.coordsXYZ = coordsXYZ
        this.stationName = stationName
    }

    setVehicleNumber(vehicleNumber: number) {
        this.vehicleNumber = vehicleNumber
    }

    getVehicleNumber() {
        return this.vehicleNumber
    }
}