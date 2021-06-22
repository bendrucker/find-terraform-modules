import * as find from '../src/find'
import * as path from 'path'

test('finds modules', async () => {
  const expected = ['a', 'b', 'c'].map(dir =>
    path.join('fixtures/basic', dir)
  )
  expect(
    await find.modules(path.resolve(__dirname, '../fixtures/basic'))
  ).toStrictEqual(expected)
})

test('excludes .terraform', async () => {
  const expected = ['fixtures/dot-terraform/a']
  expect(
    await find.modules(path.resolve(__dirname, '../fixtures/dot-terraform'))
  ).toStrictEqual(expected)
})
