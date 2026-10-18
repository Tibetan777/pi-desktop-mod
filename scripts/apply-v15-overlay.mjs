import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import console from 'node:console'
import { fileURLToPath, URL } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const specs = [
  { name: 'main', file: 'out/main/index.js', patch: 'patches/v15/main.patch', base: '0818b22d4d42de553e049b3c5b579802f8611e4f50b47d784550c638fee4e98a', target: '1e178a5ce60f69fdaf69d119406ba978983baf6b17f2afbc15601ae01ba80c81' },
  { name: 'preload', file: 'out/preload/index.js', patch: 'patches/v15/preload.patch', base: '16515278a7893b469644a5be6ef539a2e62abfcb14a77d3ac5eda0b9a4267c85', target: 'ad37854826ab174582b060f010664305f06968958c022c4c97f5a1e614cb4140' },
  { name: 'renderer', file: 'out/renderer/assets/index-BvwTAwqv.js', patch: 'patches/v15/renderer.patch', base: '90b5aa1d1054cb62c6aa77ce15ac876cffbcc2b73ecd630ed29e745fa8edad99', target: 'f2c269cc7632823d435f3319a56bfa1b42361b3c726669a4a50d8357dfb6e721' }
]

const digest = (data) => createHash('sha256').update(data).digest('hex')
const sha256 = (path) => digest(readFileSync(path))
const normalizedText = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
const normalizedSha256 = (path) => digest(normalizedText(path))
const normalizeLf = (path) => writeFileSync(path, normalizedText(path), 'utf8')

for (const spec of specs) {
  const file = join(root, spec.file)
  if (!existsSync(file)) throw new Error(`V15 overlay: missing ${spec.file}`)
  let current = sha256(file)
  let normalized = normalizedSha256(file)
  if (current === spec.target || normalized === spec.target) {
    if (current !== spec.target) normalizeLf(file)
    console.log(`[v15-overlay] ${spec.name}: already applied`)
    continue
  }
  if (current !== spec.base && normalized !== spec.base) throw new Error(`V15 overlay: ${spec.name} base hash mismatch (${current}); refusing to patch unknown build`)
  if (current !== spec.base) normalizeLf(file)
  const patch = join(root, spec.patch)
  const result = spawnSync('git', ['-c', 'core.autocrlf=false', 'apply', '--whitespace=nowarn', '-'], { cwd: root, encoding: 'utf8', input: normalizedText(patch) })
  if (result.status !== 0) throw new Error(`V15 overlay: git apply failed for ${basename(patch)}\n${result.stderr || result.stdout}`)
  normalizeLf(file)
  const after = sha256(file)
  if (after !== spec.target) throw new Error(`V15 overlay: ${spec.name} target hash mismatch (${after})`)
  console.log(`[v15-overlay] ${spec.name}: verified ${after}`)
}

console.log('[v15-overlay] all canonical V15 bundle hashes verified')
