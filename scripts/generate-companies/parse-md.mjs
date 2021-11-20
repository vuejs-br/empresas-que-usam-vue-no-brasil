import { unified } from 'unified'
import markdown from 'remark-parse'
import { readSync } from 'to-vfile'
import { selectAll } from 'hast-util-select'
import { toHast } from 'mdast-util-to-hast'
import { compact } from 'mdast-util-compact'

const parse = fileName => {
  const tree = unified()
    .use(markdown)
    .parse(readSync(fileName))

  const hast = toHast(tree)

  return compact(
    selectAll('hr ~ h2 ~ p', hast)
  )
}

export { parse }
