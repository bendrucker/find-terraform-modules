import * as find from '../src/find'
import * as path from 'path'

test('finds modules', async () => {
  const expected = ['a', 'b', 'c'].map(dir => path.join('fixtures/basic', dir))
  expect(
    await find.modules('fixtures/basic', {cwd: path.resolve(__dirname, '..')})
  ).toStrictEqual(expected)
})

test('returns . for cwd', async () => {
  const cwd = path.resolve(__dirname, '../fixtures/basic/a')
  expect(
    await find.modules(cwd, {cwd})
  ).toStrictEqual(['.'])
})

test('excludes .terraform', async () => {
  const expected = ['fixtures/dot-terraform/a']
  expect(
    await find.modules('fixtures/dot-terraform', {
      cwd: path.resolve(__dirname, '..')
    })
  ).toStrictEqual(expected)
})

test('includes .tf.json', async () => {
  const expected = ['fixtures/json/a']
  expect(
    await find.modules('fixtures/json', {
      cwd: path.resolve(__dirname, '..')
    })
  ).toStrictEqual(expected)
})
