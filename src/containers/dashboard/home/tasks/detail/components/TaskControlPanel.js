import PropTypes from 'prop-types'
import React from 'react'
import Button from 'react-native-button'
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CardView from 'react-native-cardview'
import ButtonWithIcon from '../../../../../../components/button-with-icon/ButtonWithIcon.component'
import { images } from '../../../../../../theme/index'
import tr from '../../../../../../i18n/i18n'
import styles from './taskControlPanel.styles'

class TaskControlPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expaned: false
    }
  }

  toggle = () => {
    this.setState({ expaned: !this.state.expaned })
  }

  callNumber = phoneUrl => {
    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert(tr('notice'), tr('operation_not_allow'))
          return null
        }
        return Linking.openURL(phoneUrl)
      })
      .catch(() => Alert.alert(tr('notice'), tr('operation_not_allow')))
  }

  renderContent = () => {
    const {
      onPressReport,
      startCheckingCondition,
      currentTask,
      isDropOff,
      shouldShowCompleteButton
    } = this.props

    const title = isDropOff ? tr('dropoff_location') : tr('pickup_location')
    const contactPhone = currentTask.contact
      ? (currentTask.contact.phone.indexOf('+') > -1 ? currentTask.contact.phone : `+${currentTask.contact.phone}`)
      : ''
    const contactName = currentTask.contact ? currentTask.contact.name : ''

    const buttons = [
      {
        title: tr('report_task'),
        onPress: onPressReport,
        disabled: !shouldShowCompleteButton,
        buttonTitleStyleDisabled: { color: 'gray' }
      },
      {
        title: tr('finish_task'),
        onPress: startCheckingCondition,
        disabled: !shouldShowCompleteButton,
        buttonTitleStyleDisabled: { color: 'gray' }
      }
    ]

    if (!this.state.expaned)
      return (
        <TouchableOpacity
          onPress={this.toggle}
          activeOpacity={0.7}
          style={[styles.row, { marginTop: 10, marginBottom: 15 }]}
        >
          <View style={styles.left}>
            <Image
              style={styles.iconSmall}
              source={images.icons.package}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.middle}>
            <Text style={[styles.title]}>{title}</Text>
            <Text style={[styles.address]}>{currentTask.address}</Text>
            <Text style={[styles.subDescription]}>
              {currentTask.packageSizeDescription}
            </Text>
            <Text style={[styles.name]}>
              {contactName}
            </Text>
            <TouchableOpacity
              onPress={() => this.callNumber(`tel:${contactPhone}`)}
            >
              <Text style={[styles.phone]}>
                {contactPhone}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )

    return [
      <TouchableOpacity
        onPress={this.toggle}
        activeOpacity={0.7}
        style={[styles.row, { marginTop: 10 }]}
        key={Math.random()}
      >
        <View style={styles.left}>
          <Image
            style={styles.icon}
            source={images.icons.package}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.middle}>
          <Text style={[styles.title]}>
            {currentTask.deliveryDate ? tr('job_type') : tr('detail')}
          </Text>
          {currentTask.deliveryDate &&
            <Text style={[styles.jobType]}>{currentTask.deliveryDate}</Text>}
          <Text style={[styles.description]}>
            {currentTask.timeDescription}
          </Text>
          <Text style={[styles.description]}>
            {currentTask.packageSizeDescription}
          </Text>
          <Text style={[styles.description]}>
            {currentTask.description}
          </Text>
        </View>
      </TouchableOpacity>,
      <View style={styles.row} key={Math.random()}>
        <View style={styles.left}>
          <Image
            style={styles.icon}
            source={
              isDropOff ? images.icons.dropoffIcon : images.icons.pickupIcon
            }
          />
        </View>
        <View style={styles.middle}>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={[styles.address]}>{currentTask.address}</Text>
          <Text style={[styles.name]}>
            {contactName}
          </Text>
          <TouchableOpacity
            onPress={() => this.callNumber(`tel:${contactPhone}`)}
          >
            <Text style={[styles.phone]}>
              {contactPhone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>,
      <View style={styles.buttonRow} key={Math.random()}>
        <View style={styles.buttonContainer}>
          {buttons &&
            buttons.map((button, index) =>
              <ButtonWithIcon
                onPress={button.onPress}
                disabled={button.isLoading || button.disabled}
                key={Math.random()}
                isLoading={button.isWorking}
                buttonTitleStyle={[
                  styles.buttonTitle,
                  button.disabled ? button.buttonTitleStyleDisabled : null
                ]}
                style={[
                  styles.button,
                  index === 0
                    ? styles.firstButton
                    : index === buttons.length - 1 ? styles.lastButton : null
                ]}
                title={button.title}
              />
            )}
        </View>
      </View>
    ]
  }

  render() {
    return (
      <CardView style={styles.detailView} cardElevation={2} cornerRadius={5}>
        {this.renderContent()}
        <Button containerStyle={styles.toggle} onPress={this.toggle}>
          <Ionicons name="ios-more" color="gray" size={35} />
        </Button>
      </CardView>
    )
  }
}

TaskControlPanel.propTypes = {
  onPressReport: PropTypes.func,
  startCheckingCondition: PropTypes.func,
  currentTask: PropTypes.object,
  isDropOff: PropTypes.bool,
  shouldShowCompleteButton: PropTypes.bool
}

TaskControlPanel.defaultProps = {}

export default TaskControlPanel
