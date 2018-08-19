export const requestState = {
  isWorking: true,
  isFailed: false,
  error: null,
  isCalled: true
}
export const successState = { isWorking: false, isFailed: false, error: null }
export const failedState = payload => ({
  isWorking: false,
  isFailed: true,
  error: payload
})
export const defaultValOnSelector = {
  isWorking: false,
  isFailed: false,
  error: null,
  isCalled: false
}
