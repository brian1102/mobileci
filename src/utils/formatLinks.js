import React from 'react'
import { Linking, Text, StyleSheet } from 'react-native'
import { colors } from '../theme/index'

export const styles = StyleSheet.create({
  linkText: {
    backgroundColor: colors.transparent,
    textDecorationLine: 'underline',
    color: colors.background,
  },
  normalText: {
    color: colors.midGray,
  },
})

const re = /<a[^h]+href=["|']([^"|^']+)["|']>([^<]+)<\/a>/g

const normalText = text =>
  <Text style={styles.normalText} key={text}>
    {text}
  </Text>

export const findURLs = text => {
  const matches = []
  let match = re.exec(text)
  while (match != null) {
    matches.push(match)
    match = re.exec(text)
  }
  return matches
}

export const formatLinks = text => {
  const matches = findURLs(text)
  if (matches.length === 0) return [normalText(text)]

  const result = []
  let index = 0

  matches.forEach(match => {
    const plainText = text.substr(index, match.index - index)
    const url = match[1]
    const linkText = match[2]
    if (plainText.length > 0) {
      result.push(normalText(plainText))
    }
    result.push(
      <Text
        style={styles.linkText}
        key={linkText}
        onPress={() => Linking.openURL(url)}
      >
        {linkText}
      </Text>
    )

    index = match.index + match[0].length
  })

  const plainText = text.substr(index, text.length - index)
  if (plainText.length > 0) {
    result.push(normalText(plainText))
  }

  return result
}
