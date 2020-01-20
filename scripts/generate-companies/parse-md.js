const unified = require('unified')
const markdown = require('remark-parse')
const vfile = require('to-vfile')
const toHast = require('mdast-util-to-hast')
const { selectAll } = require('hast-util-select')
const compact = require('mdast-util-compact')

const parse = fileName => {
  const tree = unified()
    .use(markdown)
    .parse(vfile.readSync(fileName))

  const hast = toHast(tree)

  return compact(
    selectAll('hr ~ h2 ~ p', hast)
  )
}

module.exports = { parse }
