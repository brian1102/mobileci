import { createSelector } from 'reselect'

const getLocationState = state => state.location
const zeroLocation = {
  accuracy: 0,
  altitude: 0,
  heading: 0,
  latitude: 0,
  longitude: 0,
  speed: 0
}

export const getLocation = createSelector([getLocationState], state =>
  state.get('location', zeroLocation)
)
