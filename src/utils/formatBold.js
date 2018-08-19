import React from 'react'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
})

const re = /<b>([^<]+)<\/b>/g

const normalText = text => <Text key={text}>{text}</Text>

const findBolds = text => {
  const matches = []
  let match = re.exec(text)
  while (match != null) {
    matches.push(match)
    match = re.exec(text)
  }
  return matches
}

export default text => {
  const matches = findBolds(text)
  if (matches.length === 0) return [normalText(text)]

  const result = []
  let index = 0

  matches.forEach(match => {
    const plainText = text.substr(index, match.index - index)
    const boldText = match[1]
    if (plainText.length > 0) {
      result.push(normalText(plainText))
    }
    result.push(
      <Text style={styles.boldText} key={boldText}>
        {boldText}
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
