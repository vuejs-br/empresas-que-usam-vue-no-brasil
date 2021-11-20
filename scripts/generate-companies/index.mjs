import { writeFile, stat } from 'node:fs/promises'
import { resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import { parse } from './parse-md.mjs'
import { extractCompanies, generateMeta } from './extract.mjs'
import prettyBytes from 'pretty-bytes'
import ora from 'ora'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SOURCE = resolve(__dirname, '../../README.md')
const TARGET = resolve(__dirname, '../../public/data.json')
const TARGET_H = relative(process.cwd(), TARGET)

const generate = async () => {
  const nodes = parse(SOURCE)
  const companies = extractCompanies(nodes)
  const meta = generateMeta(companies)

  const output = JSON.stringify({ companies, meta })

  await writeFile(TARGET, output, { encoding: 'utf8' })

  return {
    stat: await stat(TARGET),
    meta
  }
}

const spinner = ora(`Generating ${TARGET_H}`).start()

generate()
  .then(info => {
    spinner.info(` Companies: ${info.meta.total}`)
    spinner.succeed(
      ` The file "${TARGET_H}" (${prettyBytes(info.stat.size)}) was generated.`
    )
  })
  .catch(error => {
    console.error(error)
    spinner.fail(error.message)
  })
