import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, Alert } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import connect from '../../../utils/connect'
import RoundedButton from '../../../components/rounded-button/index'
import { colors } from '../../../theme/index'
import styles from './styles'
import tr from '../../../i18n/i18n'
import * as s from '../../../state/selectors'
import * as t from '../../../state/actionsType'
import a from '../../../state/actions'

let actionSheet = null

@connect(
  state => ({
    vehiclesList: s.getVehicleNameList(state),
    vehiclesRawList: s.getVehicleList(state),
    selectVehicleStatus: s.getSelectVehicleStatus(state),
    getUserInforStatus: s.getUserInfoStatus(state),
    updateDutyStatus: s.getUpdateDutyStatus(state)
  }),
  {
    selectVehicle: a[t.SELECT_VEHICLE]
  }
)
class Dialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedVehicle: ''
    }
  }

  onSelect(selectedVehicle) {
    this.setState({ selectedVehicle })
    const { vehiclesRawList, selectVehicle } = this.props

    try {
      const selected = vehiclesRawList[selectedVehicle]
      selectVehicle(selected.vehicleTypeId)
    } catch (error) {
      Alert.alert('Error choosing vehicle', error.message)
    }
  }

  render() {
    const {
      style,
      vehiclesList,
      selectVehicleStatus,
      getUserInforStatus
    } = this.props

    return (
      <View style={styles.container}>
        <View style={[styles.content, style]}>
          <Text style={styles.title}> {tr('select_vehicle')}</Text>

          <Text style={styles.description}>
            {tr('force_vehicle_selection')}
          </Text>

          <View style={styles.buttonContainer}>
            <RoundedButton
              title={tr('select')}
              onPress={() => actionSheet.show()}
              style={styles.button}
              color={colors.background}
              highlightColor={colors.brand}
              highlightTitleColor={colors.title}
              isLoading={
                (selectVehicleStatus && selectVehicleStatus.isWorking) ||
                (getUserInforStatus && getUserInforStatus.isWorking)
              }
            />
          </View>

          <ActionSheet
            ref={ref => {
              actionSheet = ref
            }}
            title={tr('select_vehicle')}
            options={vehiclesList}
            cancelButtonIndex={vehiclesList.length - 1}
            destructiveButtonIndex={-1}
            onPress={selectedVehicle => this.onSelect(selectedVehicle)}
          />
        </View>
      </View>
    )
  }
}

Dialog.propTypes = {
  selectVehicle: PropTypes.func,
  vehiclesList: PropTypes.array,
  vehiclesRawList: PropTypes.array,
  style: PropTypes.any,
  selectVehicleStatus: PropTypes.object,
  getUserInforStatus: PropTypes.object
}

Dialog.defaultProps = {}

export default Dialog
