const { isEmpty, split, trim, size, flatMap, countBy, negate, toLower, toUpper } = require('lodash')

const getLetter = name => {
  const first = name[0]

  if (parseInt(first) >= 0) {
    return '0-9'
  }
  return toUpper(first)
}

const extractChildrenData = children => {
  return children.reduce((acc, node) => {
    if (node.tagName === 'a') {
      const name = node.children[0].value

      return {
        ...acc,
        name,
        letter: getLetter(name),
        url: node.properties.href
      }
    }

    if (node.tagName === 'em') {
      const location = node.children[0].value
      return {
        ...acc,
        remote: toLower(location).includes('remoto'),
        location: split(location, '|').map(trim)
      }
    }

    if (node.type === 'text' && !isEmpty(node.value) && node.value !== '\n') {
      return {
        ...acc,
        tags: split(node.value, ',').map(trim).filter(negate(isEmpty))
      }
    }

    return acc
  }, {})
}

const generateMeta = companies => {
  const total = size(companies)
  const tags = flatMap(companies, 'tags')
  const letters = flatMap(companies, 'letter')
  return { total, letters: countBy(letters), tags: countBy(tags) }
}

const extractCompanies = nodes => {
  return nodes.map(({ children }) => extractChildrenData(children))
}

module.exports = { extractCompanies, generateMeta }
