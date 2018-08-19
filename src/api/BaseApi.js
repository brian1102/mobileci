import url from 'url'
import Config from '../config'
import HeaderManager from './HeaderManager'
import { info } from '../utils/logger'
import t from '../i18n'
import { captureException } from './analytics/CrashApi'

const GET = 'GET'
const PUT = 'PUT'
const DELETE = 'DELETE'
const POST = 'POST'

const buildQuery = data =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
const buildPath = (path, data) =>
  !data || Object.keys(data).length === 0 ? path : `${path}?${buildQuery(data)}`

export function httpGet(
  path,
  data = null,
  useToken = true,
  forceEndpoint,
  headers = {},
  dontUseCompanySlug
) {
  const fullPath = buildPath(path, data)
  return executiveFetch(
    fullPath,
    GET,
    getHeaders(useToken, headers, dontUseCompanySlug),
    null,
    useToken,
    forceEndpoint
  )
}

export function httpPut(
  path,
  data = {},
  useToken = true,
  forceEndpoint,
  headers = {}
) {
  return executiveFetch(
    path,
    PUT,
    getHeaders(useToken, headers),
    data,
    useToken,
    forceEndpoint
  )
}

export function httpDelete(
  path,
  data = {},
  useToken = true,
  forceEndpoint,
  headers = {}
) {
  return executiveFetch(
    path,
    DELETE,
    getHeaders(useToken, headers),
    data,
    useToken,
    forceEndpoint
  )
}

export function httpPost(
  path,
  data = {},
  useToken = true,
  forceEndpoint,
  headers = getHeaders(useToken)
) {
  return executiveFetch(path, POST, headers, data, useToken, forceEndpoint)
}

export async function uploadPhoto(path, uri, name, params) {
  const url = `${Config().BASE_URL}${path}`
  const headers = getHeaders(true)
  headers['Content-Type'] = 'multipart/form-data'
  // eslint-disable-next-line
  const data = new FormData()
  data.append(name, {
    uri,
    name,
    type: 'image/jpg'
  })
  data.append('name', name)

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      data.append(
        key,
        typeof params[key] === 'object'
          ? JSON.stringify(params[key])
          : params[key]
      )
    }
  }

  const config = {
    method: 'POST',
    headers,
    body: data
  }
  info(`upload api start ${url} with params `, config)
  const response = await fetch(url, config)
  const finalResponse = await processResponse(response, url)
  return finalResponse
}

function parseErrorMessage(data) {
  if (!data) return ''
  if (data.message) return data.message
  if (data.data) {
    // eslint-disable-next-line
    for (const key in data.data) {
      // eslint-disable-line guard-for-in
      let messageText = ''
      if (data.data.hasOwnProperty(key)) {
        const arrayMessage = data.data[key]
        messageText = arrayMessage && arrayMessage.length ? arrayMessage[0] : ''
      }
      return { code: key, message: messageText }
    }
  }
  return ''
}

function getErrorMessageText(errorObj) {
  // if the localization key is not defined, we will use error text from backend as default
  // so we don't worry about missing a new error code
  if (errorObj && errorObj.code) {
    return t(`api_errors.${errorObj.code}`, { defaultValue: errorObj.message })
  }
  // This is a default message if there is something wrong in our code.
  // It's only for ensure that we always have the message
  // And in the logic, actually it will not run to this code
  return 'There are something wrong. Please contact us.'
}

async function processResponse(response, apiUrl) {
  let data = null

  try {
    data = await response.text()
    data = JSON.parse(data)
    info(`[BaseApi] processResponse`, data)
  } catch (error) {
    info('[BaseAPI] ======= BACKEND ERROR =======')
    info(data)
    // make error text shorter
    let errorText = ''
    if (data.indexOf('<body>') > -1) {
      const startBodyPos = data.indexOf('<body>')
      const endBodyPos = data.indexOf('</body')
      // get content in body
      errorText = data.substring(startBodyPos + '<body>'.length, endBodyPos)
      // strip all html tags
      errorText = errorText.replace(/(<([^>]+)>)/gi, '')
    } else {
      errorText = data
    }
    captureException(errorText)
    data = { code: 'backend_error', message: error }
  }

  if (response.status >= 400) {
    info(`Call api failed ${apiUrl}`, data, response)
    const errorObj = parseErrorMessage(data)
    const message = getErrorMessageText(errorObj)
    const error = {
      simple: message,
      detail: `Server error at ${apiUrl} \n Detail: ${message}`
    }
    throw new Error(error.simple)
  }

  info(`Call api ${apiUrl} done `, response, data)
  return data
}

export function getHeaders(
  useToken = false,
  extHeaders = {},
  dontUseCompanySlug
) {
  const headers = {
    'Content-Type': 'application/json',
    ...extHeaders
  }

  const accessToken = HeaderManager.getHeader('accessToken')
  if (useToken && accessToken) {
    // eslint-disable-next-line
    headers['ACCESS_TOKEN'] = accessToken
    // eslint-disable-next-line
    if (!dontUseCompanySlug) headers['COMPANY_SLUG'] = Config().COMPANY_SLUG
  }
  return headers
}

async function executiveFetch(
  path,
  method,
  headers = getHeaders(),
  bodyData,
  useToken,
  forceEndpoint
) {
  const fetchParams = { method, headers }
  if (bodyData) {
    if (bodyData.append !== undefined) {
      fetchParams.body = bodyData
    } else {
      fetchParams.body = JSON.stringify(bodyData)
    }
  }

  const endpoint = forceEndpoint || Config().BASE_URL
  const { host, pathname: version = '', port, protocol } = url.parse(endpoint)
  const { pathname: apiPath = '', search } = url.parse(path)

  const apiUrl = url.format({
    host,
    protocol,
    port,
    search,
    pathname: `${version.replace(/\/$/, '')}/${apiPath.replace(/^\//, '')}`
  })

  info(`Call api start ${apiUrl} with params `, fetchParams)
  const response = await fetch(apiUrl, fetchParams)
  const finalResponse = await processResponse(response, apiUrl)
  return finalResponse
}
