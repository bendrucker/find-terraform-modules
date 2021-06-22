import * as core from '@actions/core'
import * as find from './find'

async function run(): Promise<void> {
  try {
    const wd = core.getInput('working-directory')
    core.setOutput('modules', await find.modules(wd))
  } catch (err) {
    core.setFailed(err.message)
  }
}

run()
