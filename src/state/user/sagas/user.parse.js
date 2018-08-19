export const userDataParse = rawUser => {
  return {
    ...rawUser,
    vehicles: rawUser.vehicles.map(v => ({
      vehicleTypeId: v.vehicle_type_id,
      name: v.name
    }))
  }
}
