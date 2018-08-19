import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, ScrollView, Text } from 'react-native'
import RoundedButton from '../rounded-button/RoundedButton'
import t from '../../i18n/i18n'
import { colors } from '../../theme/index'
import CheckBox from '../../components/checkbox/CheckBox'
import styles from './styles'

class SelectableList extends React.Component {
  constructor(props) {
    // noinspection JSCheckFunctionSignatures
    super(props)
    this.state = {
      choose: [],
      reasons: this.props.reasons,
      showCustomForm: false
    }
  }

  // eslint-disable-next-line
  submit = () => {
    const { choose } = this.state

    if (!this.state.showCustomForm) {
      if (!choose.length) {
        // eslint-disable-next-line
        alert(t('delivery_choose_reason'))

        return
      }
    } else {
      // eslint-disable-next-line
      if (!choose.length) {
        // eslint-disable-next-line
        alert(t('enter_your_reason'))
        return
      }
    }

    const arrReason = choose.map(c => c.description)
    this.props.onSubmit(arrReason)
  }

  // eslint-disable-next-line
  showCustomForm = () => {
    this.setState({ showCustomForm: true, choose: [] })
  }

  // eslint-disable-next-line
  handleOnChange = (checked, reason) => {
    const { singleSelect } = this.props

    if (!singleSelect) {
      if (checked) {
        const arr = this.state.choose
        arr.push(reason)
        this.setState({ choose: arr })
      } else {
        const arr = this.state.choose.filter(r => r !== reason)
        this.setState({ choose: arr })
      }
    } else {
      this.setState({ choose: [reason] })
    }
  }

  // eslint-disable-next-line
  renderContent = () => {
    if (this.state.showCustomForm)
      return (
        <View style={styles.scrollView}>
          <Text style={styles.titleOfCustomReason}>{t('describe')}</Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder={t('reason_description')}
            style={styles.textInput}
            onChangeText={text =>
              this.setState({ choose: [{ description: text }], text })}
            value={this.state.text}
            multiline
            placeholderTextColor={'#818181'}
            numberOfLines={5}
            returnKeyType="done"
            blurOnSubmit
          />
        </View>
      )
    const { reasons, choose } = this.state
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainerStyle}
      >
        {reasons.map((reason, i) => {
          const r = reason
          return (
            <CheckBox
              key={i}
              label={r.description}
              labelStyle={styles.checkBoxText}
              iconSize={30}
              checked={choose.indexOf(r) !== -1}
              labelPosition="left"
              iconName="faCircleFill"
              checkedColor="#2492F3"
              uncheckedColor="#181F27"
              onChange={e => this.handleOnChange(e, reason)}
            />
          )
        })}
        <CheckBox
          label={t('other_reason')}
          labelStyle={styles.checkBoxText}
          iconSize={30}
          labelPosition="left"
          iconName="faCircleFill"
          checkedColor="#2492F3"
          uncheckedColor="#181F27"
          onChange={this.showCustomForm}
        />
      </ScrollView>
    )
  }

  // eslint-disable-next-line
  clear = () => {
    this.props.hideDialog()
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.showCustomForm ? { marginBottom: 10 } : null
        ]}
      >
        {this.renderContent()}
        <View style={styles.buttons}>
          <RoundedButton
            title={t('cancel')}
            onPress={this.clear}
            color={colors.background}
            style={styles.button}
            scale={0.8}
          />
          <RoundedButton
            title={t('signature_submit')}
            onPress={this.submit}
            color={colors.background}
            style={styles.button}
            isLoading={this.props.isMarking}
            scale={0.8}
          />
        </View>
      </View>
    )
  }
}

SelectableList.propTypes = {
  isMarking: PropTypes.bool,
  hideDialog: PropTypes.func,
  onSubmit: PropTypes.func,
  singleSelect: PropTypes.bool,
  reasons: PropTypes.array
}

export default SelectableList
