const nativeNodeModulesPlugin = require('./esbuild-plugin-node-files');
require('esbuild')
	.build({
		entryPoints: ['src/index.js'],
		bundle: true,
		// format: 'esm',
		platform: 'node',
		target: ['node12.22'],
		plugins: [nativeNodeModulesPlugin],
		outfile: 'dist/out.js',
		mainFields: ['module', 'main']
	});
