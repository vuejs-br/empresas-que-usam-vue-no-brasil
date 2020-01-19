import { isEmpty, filter } from 'lodash-es'
import { sanitize } from '../utils'

const filterByTags = (tags, companies) => {
  if (isEmpty(tags)) {
    return companies
  }

  const result = filter(companies, company => {
    return tags.every(tagName => {
      return company.tags.includes(tagName)
    })
  })

  return result
}

const filterByLocation = (location, companies) => {
  if (isEmpty(location)) {
    return companies
  }

  const val = sanitize(location)

  const result = filter(companies, company => {
    return company.location.some(row => {
      return sanitize(row).includes(val)
    })
  })

  return result
}

const filterByName = (name, companies) => {
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

  return Object.freeze(
    filterByName(name, filterByTags(tags, filterByLocation(location, companies)))
  )
}

export { filterCompanies }
