#!/usr/bin/env node

import main from '../dist/out.js';

main.default();
/**
 * Make sure that the Bitbucket account is set up correctly.
 * Run setup if not.
 * Skip for commands in 'ignoredCommands' array.
 */
// const configCheck = require('../src/helpers/config-check');
// const ignoredCommands = ['about', 'help', 'debug'];
// const cliArguments = process.argv.slice(2);
// const intersection = cliArguments.filter(value => ignoredCommands.includes(value));

// if (intersection.length === 0) {
// 	configCheck().then(success => {
// 		if (success === false) {
// 			// Nope? Guess we have to run setup first!
// 			process.argv[2] = 'setup';
// 		}

// 		// All set! Guess we are done here!

// 		if (process.argv.length === 2) {
// 			process.argv[2] = 'default';
// 		}
// 		require('@oclif/command')
// 			.run()
// 			.then(require('@oclif/command/flush'))
// 			.catch(require('@oclif/errors/handle'));
// 	});
// } else {
// 	if (process.argv.length === 2) {
// 		process.argv[2] = 'default';
// 	}

// 	require('@oclif/command')
// 		.run()
// 		.then(require('@oclif/command/flush'))
// 		.catch(require('@oclif/errors/handle'));
// }
