/**
 * This is the ActionSheet component. Below is the example of options:
 * { value: 'en', label: 'English' }
 */

import React, { Component } from 'react'
import ActionSheet from 'react-native-actionsheet'

export default class ActionSheetContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      options: ['Cancel'],
      callback: null
    }
  }

  show = (title, options, callback) => {
    this.setState({ title, options, callback }, () => {
      this.actionSheet.show()
    })
  }

  onPress = (index) => {
    if (this.state.callback) this.state.callback(this.state.options[index].value)
  }

  render () {
    return (
      <ActionSheet
        {...this.props}
        ref={o => this.actionSheet = o}
        options={this.state.options.map(o => o.label)}
        title={this.state.title}
        onPress={this.onPress}
      />
    )
  }
}