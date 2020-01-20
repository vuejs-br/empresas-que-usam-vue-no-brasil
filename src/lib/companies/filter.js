import { isEmpty } from 'lodash-es'
import pWaterfall from 'p-waterfall'
import pFilter from 'p-filter'
import { sanitize } from '../utils'
import { onIdle } from '../on-idle'

const filter = (data, cb) => {
  return pFilter(data, async row => {
    return onIdle(() => cb(row))
  })
}

const filterByTags = async (tags, companies) => {
  if (isEmpty(tags)) {
    return companies
  }

  return filter(companies, company => {
    return tags.every(tagName => {
      return company.tags.includes(tagName)
    })
  })
}

const filterByLocation = async (location, companies) => {
  if (isEmpty(location)) {
    return companies
  }

  const val = sanitize(location)

  return filter(companies, company => {
    return company.location.some(row => {
      return sanitize(row).includes(val)
    })
  })
}

const filterByName = async (name, companies) => {
  if (isEmpty(name)) {
    return companies
  }

  const val = sanitize(name)

  return filter(companies, company => {
    return sanitize(company.name).includes(val)
  })
}

const filterCompanies = (rules, companies) => {
  const { tags, name, location } = rules

  return pWaterfall([
    result => onIdle(() => filterByTags(tags, result)),
    result => onIdle(() => filterByName(name, result)),
    result => onIdle(() => filterByLocation(location, result)),
    result => Object.freeze(result)
  ], companies)
}

export { filterCompanies }
