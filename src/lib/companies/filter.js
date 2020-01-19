import { isEmpty, filter } from 'lodash-es'

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

const filterCompanies = (rules, companies) => {
  const { tags } = rules

  return Object.freeze(
    filterByTags(tags, companies)
  )
}

export { filterCompanies }
