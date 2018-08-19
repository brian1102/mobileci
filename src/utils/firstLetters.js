const firstLetters = text =>
  text.split(' ').map(str => str.charAt(0).toUpperCase()).join('')

export default firstLetters
