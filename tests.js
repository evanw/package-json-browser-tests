const positiveTests = [
  {
    'entry.js': `require('foo')`,
    'package.json': `{ "browser": { "./foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('foo')`,
    'package.json': `{ "browser": { "foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo')`,
    'package.json': `{ "browser": { "./foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo')`,
    'package.json': `{ "browser": { "foo": "./file" } }`,
    'file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo/bar": "./file" } }`,
    'node_modules/pkg/foo/bar.js': `invalid syntax`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo/bar": "./file" } }`,
    'node_modules/pkg/foo/bar.js': `invalid syntax`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `require('foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `require('foo/bar')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo/bar": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "browser": { "./index.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "browser": { "./index.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/index.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "browser": { "./index": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "browser": { "./index": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/main.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "main": "./main",\n  "browser": { "./main.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "main": "./main",\n  "browser": { "./main.js": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg/package.json': `{ "browser": { "pkg2": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg2/index.js': `throw 'fail'`,
    'node_modules/pkg3/index.js': `input.works = true`,
  },
]

const negativeTests = [
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "browser": { ".": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo.js')`,
    'package.json': `{ "browser": { "foo": "./file" } }`,
    'index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo.js')`,
    'node_modules/pkg/package.json': `{ "browser": { "foo": "./file" } }`,
    'node_modules/pkg/index.js': `input.works = true`,
  },
  {
    'entry.js': `require('./foo.js')`,
    'package.json': `{ "browser": { "./foo": "./file" } }`,
    'index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg/foo.js')`,
    'node_modules/pkg/package.json': `{ "browser": { "./foo": "./file" } }`,
    'node_modules/pkg/index.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/main.js': `throw 'fail'`,
    'node_modules/pkg/package.json': `{ "main": "./main.js",\n  "browser": { "./main": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'node_modules/pkg/package.json': `{ "main": "./main.js",\n  "browser": { "./main": "./file" } }`,
    'node_modules/pkg/file.js': `input.works = true`,
  },
  {
    'entry.js': `require('pkg')`,
    'package.json': `{ "browser": { "pkg2": "pkg3" } }`,
    'node_modules/pkg/index.js': `require('pkg2')`,
    'node_modules/pkg/package.json': `{ "browser": {} }`,
    'node_modules/pkg2/index.js': `throw 'fail'`,
    'node_modules/pkg3/index.js': `input.works = true`,
  },
]

const fs = require('fs')
const path = require('path')
const browserify = require('browserify')
const webpack = require('webpack')
const esbuild = require('esbuild')
const parcel = require('@parcel/core')
const rollup = require('rollup')
const pluginNodeResolve = require('@rollup/plugin-node-resolve')
const pluginCommonJS = require('@rollup/plugin-commonjs')
const inDir = path.join(__dirname, 'in')
const outDir = path.join(__dirname, 'out')
const parcelCacheDir = path.join(__dirname, '.parcel-cache')

function browserifyFn() {
  return new Promise(resolve => {
    browserify(path.join(inDir, 'entry.js')).bundle((err, out) => {
      if (!err) {
        try {
          const input = {}
          new Function('input', out)(input)
          if (!input.works) throw new Error('Expected "works"')
        } catch (e) {
          err = e
        }
      }
      resolve(err)
    })
  })
}

function webpackFn() {
  return new Promise(resolve => webpack({
    entry: path.join(inDir, 'entry.js'),
    output: {
      path: outDir,
      filename: 'result.js',
    },
  }, (err, stats) => {
    if (!err && stats.hasErrors()) err = stats.toJson().errors[0]
    if (!err) {
      try {
        const input = {}
        new Function('input', fs.readFileSync(path.join(outDir, 'result.js')))(input)
        if (!input.works) throw new Error('Expected "works"')
      } catch (e) {
        err = e
      }
    }
    resolve(err)
  }))
}

async function esbuildFn() {
  let err
  try {
    const result = await esbuild.build({
      entryPoints: [path.join(inDir, 'entry.js')],
      bundle: true,
      write: false,
      logLevel: 'silent',
    })
    const input = {}
    new Function('input', result.outputFiles[0].text)(input)
    if (!input.works) throw new Error('Expected "works"')
  } catch (e) {
    if (e && e.errors && e.errors[0]) e = new Error(e.errors[0].text)
    err = e
  }
  return err
}

async function parcelFn() {
  let err
  try {
    // Prevent parcel from messing with the console
    require('@parcel/logger').patchConsole = () => 0
    require('@parcel/logger').unpatchConsole = () => 0
    await new parcel.default({
      entries: path.join(inDir, 'entry.js'),
      defaultConfig: require.resolve('@parcel/config-default'),
      defaultTargetOptions: {
        distDir: outDir,
      },
    }).run()
    const input = {}
    const globalObj = {} // Prevent parcel from messing with the global object
    new Function('input', 'globalThis', 'self', 'window', 'global',
      fs.readFileSync(path.join(outDir, 'entry.js'), 'utf8'))(
        input, globalObj, globalObj, globalObj, globalObj)
    if (!input.works) throw new Error('Expected "works"')
  } catch (e) {
    err = e
  }
  return err
}

async function rollupFn() {
  let err
  try {
    const bundle = await rollup.rollup({
      input: path.join(inDir, 'entry.js'),
      onwarn: x => { throw new Error(x) },
      plugins: [
        pluginNodeResolve.default({
          browser: true,
        }),
        pluginCommonJS(),
      ],
    })
    const { output } = await bundle.generate({
      format: 'iife',
      name: 'name',
    })
    const input = {}
    new Function('input', output[0].code)(input)
    if (!input.works) throw new Error('Expected "works"')
  } catch (e) {
    err = e
  }
  return err
}

const bundlers = {
  webpack: webpackFn,
  parcel: parcelFn,
  browserify: browserifyFn,
  esbuild: esbuildFn,
  rollup: rollupFn,
}

function reset() {
  fs.rmSync(inDir, { recursive: true, force: true })
  fs.rmSync(outDir, { recursive: true, force: true })
  fs.rmSync(parcelCacheDir, { recursive: true, force: true })
}

function setup(test) {
  fs.mkdirSync(inDir, { recursive: true })

  for (const file in test) {
    const absFile = path.join(inDir, file)
    fs.mkdirSync(path.dirname(absFile), { recursive: true })
    fs.writeFileSync(absFile, test[file])
  }
}

async function run() {
  let positiveCounter = 0
  const positiveResults = []
  for (const test of positiveTests) {
    console.log(`Positive test ${positiveCounter++}`)
    reset()
    setup(test)
    const result = { test }

    for (const bundler in bundlers) {
      const err = await bundlers[bundler]()
      console.log(`  ${bundler}: ${err ? `🚫 ${err && err.message || err}`.split('\n')[0] : '✅'}`)
      result[bundler] = !err
    }

    positiveResults.push(result)
  }

  let negativeCounter = 0
  const negativeResults = []
  for (const test of negativeTests) {
    console.log(`Negative test ${negativeCounter++}`)
    reset()
    setup(test)
    const result = { test }

    for (const bundler in bundlers) {
      const err = await bundlers[bundler]()
      console.log(`  ${bundler}: ${err ? `✅` : '🚫 Unexpected success'}`)
      result[bundler] = !!err
    }

    negativeResults.push(result)
  }

  reset()

  const printTable = results => {
    text += `<table>\n`
    text += `<tr><th>Test</th>`
    for (const bundler in bundlers) {
      text += `<th>${bundler}</th>`
    }
    text += `</tr>\n`
    const counts = {}
    for (const result of results) {
      text += `<tr><td><pre>`
      for (const file in result.test) {
        text += `${file}:\n  ${result.test[file].replace(/\n/g, '\n  ')}\n`
      }
      text += `</pre></td>\n`
      for (const bundler in bundlers) {
        text += `<td>${result[bundler] ? '✅' : '🚫'}</td>\n`
        if (result[bundler]) counts[bundler] = (counts[bundler] | 0) + 1
      }
      text += `</tr>\n`
    }
    text += `<tr><td>Percent handled:</td>\n`
    for (const bundler in bundlers) {
      text += `<td>${(counts[bundler] / results.length * 100).toFixed(1)}%</td>\n`
    }
    text += `</tr>\n`
    text += `</table>\n\n`
  }

  const readmePath = path.join(__dirname, 'README.md')
  const readmeText = fs.readFileSync(readmePath, 'utf8')
  const index = readmeText.indexOf('## Positive Results')
  let text = readmeText.slice(0, index)

  text += `## Positive Results\n\n`
  text += `These tests are expected to pass. Each test is considered successful ` +
    `if the bundle is generated without errors and if the resulting bundle runs ` +
    `the code \`input.works = true\`.\n\n`
  printTable(positiveResults)

  text += `## Negative Results\n\n`
  text += `These tests are expected to fail. Each test is considered a failure ` +
    `if the bundle is generated without errors and if the resulting bundle runs ` +
    `the code \`input.works = true\`.\n\n`
  printTable(negativeResults)

  fs.writeFileSync(readmePath, text)
}

run()
