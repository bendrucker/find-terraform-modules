import * as glob from '@actions/glob'
import * as path from 'path'

export async function modules(wd: string): Promise<string[]> {
  const globber = await glob.create(
    [path.join(wd, '**', '*.tf'), '!**/.terraform/**/*'].join('\n')
  )
  const files = await globber.glob()

  const mods = new Set(
    files.map(file => path.dirname(file)).sort((a, b) => (a > b ? 1 : -1))
  )

  return [...mods]
}
