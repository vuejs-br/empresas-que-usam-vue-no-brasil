import { toLower, deburr } from 'lodash-es'

const sanitize = val => toLower(deburr(val))

/**
 * Convert data to its real value
 *
 * @type Function
 * @param {String} rawKey
 * @param {any} rawValue
 * @returns {any} converted value
 */
const convertToValue = (rawKey, rawValue) => {
  if (rawValue === 'true' || rawValue === 'false') {
    return JSON.parse(rawValue)
  }
  if (rawKey === 'tags') {
    return rawValue.split(',')
  }
  return rawValue
}

/**
 * @type Function
 * @returns {String | undefined} possible raw params from url
 */
const getRawParams = () => {
  return document.location.toString().split('?')[1]
}

/**
 * Get params from url and set to `this.filters` obj
 *
 * @type Function
 * @returns {void}
 */
function paramsToFilters () {
  if (!window.onpopstate) window.onpopstate = paramsToFilters.bind(this)

  let rawParams = getRawParams()
  if (rawParams) {
    rawParams = new URLSearchParams(rawParams)
    this.filters = [...rawParams.entries()].reduce((acc, cur) => {
      acc[cur[0]] = convertToValue(...cur)
      return acc
    }, {})
  }
}

export { sanitize, paramsToFilters }
