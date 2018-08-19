import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { font } from '../../theme/index'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8,
  },
  currency: {
    fontSize: font.sizes.small,
    fontWeight: 'normal',
  },
  price: {
    marginLeft: 4,
    fontSize: font.sizes.small,
    fontWeight: 'bold',
  },
})

const PriceView = ({ currency, color, price }) =>
  <View style={styles.container}>
    <Text style={[styles.currency, color && { color }]} numberOfLines={1}>
      {currency}
    </Text>
    <Text style={[styles.price, color && { color }]} numberOfLines={1}>
      {price.toFixed(2)}
    </Text>
  </View>

PriceView.propTypes = {
  color: PropTypes.string,
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

PriceView.defaultProps = {
  color: null,
}

export default PriceView
