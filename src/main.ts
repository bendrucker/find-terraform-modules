import {getInput, setOutput, setFailed} from '@actions/core'
import * as find from './find'

async function run(): Promise<void> {
  try {
    const wd = getInput('working-directory')
    setOutput(
      'modules',
      await find.modules(wd, {
        cwd: process.cwd(),
        glob: getInput('glob'),
        followSymbolicLinks: getInput('follow-symbolic-links').toUpperCase() !== 'FALSE'
      })
    )
  } catch (err) {
    setFailed(err as Error)
  }
}

run()
