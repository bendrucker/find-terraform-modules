import {build} from 'esbuild'

await build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node24',
  legalComments: 'inline',
  outfile: 'dist/index.js',
  banner: {
    js: "import {createRequire} from 'node:module';\nconst require = createRequire(import.meta.url);"
  }
})
