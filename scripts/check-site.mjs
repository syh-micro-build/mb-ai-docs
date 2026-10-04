import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Check the deployable HTML, including links introduced by navigation/theme config.
// External links are deliberately excluded so CI does not depend on other sites.
const root = path.resolve(fileURLToPath(new URL('../docs/.vitepress/dist/', import.meta.url)))
const base = '/docs/'
const origin = 'https://docs-check.invalid'
const errors = new Set()
const htmlCache = new Map()

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(entry => {
    const location = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(location) : [location]
  }))
  return files.flat()
}

async function exists(file) {
  try { return (await stat(file)).isFile() } catch { return false }
}

async function html(file) {
  if (!htmlCache.has(file)) htmlCache.set(file, await readFile(file, 'utf8'))
  return htmlCache.get(file)
}

function decodeAttribute(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
}

async function resolveTarget(url) {
  const pathname = decodeURIComponent(url.pathname)
  if (!pathname.startsWith(base)) return null
  const target = path.resolve(root, pathname.slice(base.length))
  // Never allow encoded traversal to escape the build directory.
  const relative = path.relative(root, target)
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null
  const candidates = pathname.endsWith('/')
    ? [path.join(target, 'index.html')]
    : [target, `${target}.html`, path.join(target, 'index.html')]
  for (const candidate of candidates) if (await exists(candidate)) return candidate
  return null
}

let files
try { files = await walk(root) } catch {
  console.error('Build output missing. Run npm run docs:build first.')
  process.exit(1)
}
const pages = files.filter(file => file.endsWith('.html'))
let checked = 0

for (const page of pages) {
  const relative = path.relative(root, page).split(path.sep).join('/')
  const source = await html(page)
  const pageUrl = new URL(base + relative.replace(/index\.html$/, '').replace(/\.html$/, ''), origin)

  if (!/<html[^>]+lang="zh-CN"/.test(source)) errors.add(`${relative}: missing zh-CN language`)
  if (!/<title>[^<]*Micro Build AI[^<]*<\/title>/.test(source)) errors.add(`${relative}: missing brand title`)

  for (const match of source.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const attributes = match[1]
    if (/\bhref="https:\/\/ai\.mbuild\.top(?:\/|\")/.test(attributes) && !/\btarget="_self"/.test(attributes)) {
      errors.add(`${relative}: platform link must open in the current tab`)
    }
  }
  if (relative !== '404.html' && !source.includes('>主题<')) errors.add(`${relative}: missing Chinese theme label`)

  for (const match of source.matchAll(/<img\b([^>]*)>/g)) {
    if (/\bsrc="\/docs\/images\//.test(match[1]) && !/\balt="[^"]+"/.test(match[1])) {
      errors.add(`${relative}: tutorial image needs alternative text`)
    }
  }

  for (const match of source.matchAll(/\b(?:href|src)=(?:"([^"]*)"|'([^']*)')/g)) {
    const value = decodeAttribute(match[1] ?? match[2])
    if (!value || /^(?:data:|mailto:|tel:|javascript:)/i.test(value)) continue
    const targetUrl = new URL(value, pageUrl)
    if (targetUrl.origin !== origin) continue
    checked++
    const target = await resolveTarget(targetUrl)
    if (!target) {
      errors.add(`${relative}: missing target or wrong base: ${value}`)
      continue
    }
    if (targetUrl.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(targetUrl.hash.slice(1))
      const ids = [...(await html(target)).matchAll(/\bid="([^"]+)"/g)].map(match => decodeAttribute(match[1]))
      if (!ids.includes(id)) errors.add(`${relative}: missing anchor: ${value}`)
    }
  }
}

const requiredPages = ['index.html', 'getting-started.html', 'api-key.html', 'tools/codex.html', 'tools/claude-code.html', 'tools/cc-switch.html', 'tools/cursor.html', 'tools/cherry-studio.html', 'faq.html', '404.html']
for (const page of requiredPages) {
  if (!await exists(path.join(root, page))) errors.add(`Missing MVP page: ${page}`)
}

if (errors.size) {
  console.error([...errors].join('\n'))
  process.exit(1)
}
console.log(`Verified ${pages.length} HTML pages and ${checked} local links/assets under ${base}.`)
