import { toLower, deburr } from 'lodash-es'

const sanitize = val => toLower(deburr(val))

export { sanitize }
