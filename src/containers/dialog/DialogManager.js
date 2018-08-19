import PropTypes from 'prop-types'
import React from 'react'
import * as c from '../../state/constants'
import CommonUI from './common-dialog/Dialog.component'
import VehicleSelectUI from './vehicle-select-dialog/VehicleSelect.component'
import LocationWarning from './location-warning-dialog/LocationWarning.dialog'

// eslint-disable-next-line
class DialogManager extends React.Component {
  render() {
    const { dialog } = this.props
    switch (dialog.ui) {
      case c.DIALOG_UI_COMMON:
        return <CommonUI {...dialog} />
      case c.DIALOG_UI_VEHICLE_SELECTION:
        return <VehicleSelectUI />
      case c.DIALOG_UI_LOCATION:
        return <LocationWarning />

      default:
        return <CommonUI {...dialog} />
    }
  }
}

DialogManager.propTypes = {
  dialog: PropTypes.object
}

export default DialogManager
