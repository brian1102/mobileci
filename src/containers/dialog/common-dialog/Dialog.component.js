import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import RoundedButton from '../../../components/rounded-button/index'
import { colors, font } from '../../../theme/index'
import formatBold from '../../../utils/formatBold'
import SelectableList from '../../../components/selectable-list/SelectableList'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  content: {
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#222C35',
    borderRadius: 20,
    paddingBottom: 16
  },
  title: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.background,
    fontSize: font.sizes.medium,
    textAlign: 'center',
    paddingHorizontal: 8
  },
  description: {
    marginBottom: 24,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.background,
    fontSize: font.sizes.small,
    textAlign: 'center'
  },
  button: {
    minWidth: 70
  },
  separator: {
    width: 64,
    height: 2,
    marginBottom: 32,
    marginTop: 32
  },
  icon: {
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 100
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

const createButton = (title, onPress) =>
  <RoundedButton
    key={title}
    title={title}
    onPress={onPress}
    style={styles.button}
    color={colors.background}
    highlightColor={colors.brand}
    highlightTitleColor={colors.title}
  />

const renderButton = options => {
  if (!options.length) return null
  return (
    <View style={styles.buttonContainer}>
      {options.map(option => createButton(option.title, option.onPress))}
    </View>
  )
}

const Dialog = ({
  color,
  description,
  icon,
  title,
  options,
  selectableOptions,
  style,
  onSubmitSelectableOptions,
  hideDialog,
  singleSelect
}) =>
  <View style={styles.container}>
    <View style={[styles.content, style]}>
      <Text style={styles.title}>{title}</Text>
      {icon &&
        <Image
          source={icon}
          style={[styles.icon, { tintColor: color }]}
          resizeMode="contain"
        />}
      {selectableOptions &&
        <SelectableList
          reasons={selectableOptions}
          onSubmit={onSubmitSelectableOptions}
          hideDialog={hideDialog}
          singleSelect={singleSelect}
        />}
      {description &&
        <Text style={styles.description}>{formatBold(description)}</Text>}
      {renderButton(options)}
    </View>
  </View>

Dialog.propTypes = {
  color: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  onSubmitSelectableOptions: PropTypes.func,
  selectableOptions: PropTypes.any,
  style: PropTypes.any,
  hideDialog: PropTypes.func,
  singleSelect: PropTypes.bool
}

Dialog.defaultProps = {
  color: colors.alert,
  description: null,
  options: []
}

export default Dialog
