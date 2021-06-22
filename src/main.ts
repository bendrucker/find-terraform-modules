import * as core from '@actions/core'
import * as glob from '@actions/glob'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const wd = core.getInput('working-directory')

    const globber = await glob.create(path.join(wd, '**', '*.tf'))
    const files = await globber.glob()

    const modules = new Set(
      files.map(file => path.dirname(file)).sort((a, b) => (a > b ? 1 : -1))
    )

    core.setOutput('modules', Array.from(modules))
  } catch (err) {
    core.setFailed(err.message)
  }
}

run()
