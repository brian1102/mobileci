export default string =>
  `${string ? string.replace(/(?:\r\n|\r|\n)/g, ' ') : ''}`
