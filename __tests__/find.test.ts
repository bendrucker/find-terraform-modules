import {test} from 'node:test'
import assert from 'node:assert/strict'
import * as path from 'node:path'
import * as find from '../src/find.ts'

test('finds modules', async () => {
  const expected = ['a', 'b', 'c'].map(dir => path.join('fixtures/basic', dir))
  assert.deepEqual(
    await find.modules('fixtures/basic', {
      cwd: path.resolve(import.meta.dirname, '..')
    }),
    expected
  )
})

test('returns . for cwd', async () => {
  const cwd = path.resolve(import.meta.dirname, '../fixtures/basic/a')
  assert.deepEqual(await find.modules(cwd, {cwd}), ['.'])
})

test('excludes .terraform', async () => {
  assert.deepEqual(
    await find.modules('fixtures/dot-terraform', {
      cwd: path.resolve(import.meta.dirname, '..')
    }),
    ['fixtures/dot-terraform/a']
  )
})

test('includes .tf.json', async () => {
  assert.deepEqual(
    await find.modules('fixtures/json', {
      cwd: path.resolve(import.meta.dirname, '..')
    }),
    ['fixtures/json/a']
  )
})

test('custom glob', async () => {
  assert.deepEqual(
    await find.modules('.', {
      glob: 'fixtures/dot-terraform/**',
      cwd: path.resolve(import.meta.dirname, '..')
    }),
    ['fixtures/dot-terraform/a']
  )
})
