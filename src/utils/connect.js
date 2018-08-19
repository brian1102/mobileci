import { connectWithLifecycle } from 'react-lifecycle-component'

const connect = (
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
) => component => {
  const container = connectWithLifecycle(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(component)
  container.navigationOptions = component.navigationOptions
  return container
}

export default connect
