# Tests for the `browser` field in `package.json`

Most JavaScript bundlers support a special bundler-specific field in `package.json` called `browser`. The idea is that this field lets you override certain import paths for node-specific code with browser-specific alternatives.

There is a "specification" for this field here: https://github.com/defunctzombie/package-browser-field-spec. However, the specification is abandoned, doesn't actually specify much, and comes without any tests. As a result, bundles implement this feature inconsistently leading to this feature breaking often in different situations.

This repository is a collection of some tests for this feature. The tests are not necessarily comprehensive. But they are better than nothing.

## Results

Each test is considered successful if the bundle is generated without errors and if the resulting bundle runs the code `input.works = true`.

<table>
<tr><th>Test</th><th>browserify</th><th>webpack</th><th>esbuild</th><th>parcel</th><th>rollup</th></tr>
<tr><td><pre>entry.js:
  require('foo')
package.json:
  { "browser": { "./foo": "./file" } }
file.js:
  input.works = true
</pre></td><td>✅</td><td>🚫</td><td>🚫</td><td>🚫</td><td>✅</td></tr>
<tr><td><pre>entry.js:
  require('foo')
package.json:
  { "browser": { "foo": "./file" } }
file.js:
  input.works = true
</pre></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td><pre>entry.js:
  require('./foo')
package.json:
  { "browser": { "./foo": "./file" } }
file.js:
  input.works = true
</pre></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td><pre>entry.js:
  require('./foo')
package.json:
  { "browser": { "foo": "./file" } }
file.js:
  input.works = true
</pre></td><td>🚫</td><td>✅</td><td>🚫</td><td>🚫</td><td>🚫</td></tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "./foo/bar": "./file" } }
node_modules/pkg/foo/bar.js:
  invalid syntax
node_modules/pkg/file.js:
  input.works = true
</pre></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>🚫</td></tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "foo/bar": "./file" } }
node_modules/pkg/foo/bar.js:
  invalid syntax
node_modules/pkg/file.js:
  input.works = true
</pre></td><td>🚫</td><td>✅</td><td>🚫</td><td>🚫</td><td>🚫</td></tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "./foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td><td>🚫</td><td>✅</td><td>🚫</td><td>✅</td><td>🚫</td></tr>
<tr><td><pre>entry.js:
  require('pkg/foo/bar')
node_modules/pkg/package.json:
  { "browser": { "foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td><td>🚫</td><td>✅</td><td>🚫</td><td>🚫</td><td>🚫</td></tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  require('foo/bar')
node_modules/pkg/package.json:
  { "browser": { "./foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td><td>✅</td><td>🚫</td><td>🚫</td><td>🚫</td><td>✅</td></tr>
<tr><td><pre>entry.js:
  require('pkg')
node_modules/pkg/index.js:
  require('foo/bar')
node_modules/pkg/package.json:
  { "browser": { "foo/bar": "./file" } }
node_modules/pkg/file.js:
  input.works = true
</pre></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
</table>
