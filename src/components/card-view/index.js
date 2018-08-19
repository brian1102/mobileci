import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Platform } from 'react-native'
import CardView from 'react-native-cardview'

const styles = StyleSheet.create({
  content: {
    paddingLeft: 15,
    paddingRight: Platform.OS === 'ios' ? 10 : 20,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 15 : 20
  }
})

const CardViewContainer = (props) => {
  return (
    <CardView {...props}>
      <View style={[styles.content, props.contentContainerStyle]}>
        {props.children}
      </View>
    </CardView>
  )
}

CardViewContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
  contentContainerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number])
}

export default CardViewContainer