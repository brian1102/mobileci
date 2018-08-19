const headers = {}
export default {
  setHeader: (name, value) => (headers[name] = value),
  getHeader: name => headers[name],
}
