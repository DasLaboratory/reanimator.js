# reanimator.js dev notes

Reanimate dead projects faster than you can say 'Lazarus of Bethany'!

###### Development (watch)

Using [esbuild](https://esbuild.github.io/):

```bash
npm start
# or
npm run watch
# or
npm run dev
```

###### Build

Using [esbuild](https://esbuild.github.io/):

```bash
npm run build
```

### Publish new version to npm registry

##### Syntax

npm run bump:\<newversion> --message=\<commitmessage>

##### Options

**newversion:**
major | minor | patch | premajor | preminor | prepatch | prerelease

**commitmessage:**
A string that will become the commit message (if unclean, the repository will be committed before published on npm)

##### Example

```bash
npm run bump:patch --message="Fixed that thing with the error. Like... you know. That error."
```

##### Dry-run

```bash
npm publish --dry-run
```

See also:
[npm-version](https://docs.npmjs.com/cli/version)
[npm-publish](https://docs.npmjs.com/cli/publish)
[Updating your published package version number](https://docs.npmjs.com/updating-your-published-package-version-number)

## patch-package

To include `package.json` files in the files that are scanned for changes:

```bash
npx patch-package --exclude 'nothing' some-package
```
