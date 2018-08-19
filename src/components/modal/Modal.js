import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import UI from '../../utils/UI'

export default class ModalContainer extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onPreDismiss: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
  }

  static defaultProps = {
    visible: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible })
    }
  }

  open = () => {
    this.setState({ visible: true })
  }

  close = () => {
    if (this.props.onPreDismiss) this.props.onPreDismiss()
    this.setState({ visible: false })
  }

  render() {
    const { visible } = this.state

    return (
      <Modal
        {...this.props}
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={this.close}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={this.close} />
          {this.props.children}
          <TouchableOpacity onPress={this.close} style={styles.btnClose}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingTop: UI.getStatusBarHeight(true),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  btnClose: {
    position: 'absolute',
    right: 0,
    top: UI.getStatusBarHeight(true) + 10,
    width: 40,
    height: 40,
  },
})
