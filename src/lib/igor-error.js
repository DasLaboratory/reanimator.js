/* eslint max-params: ["error", 5] */
import { dim, bold } from 'chalk';
import boxen from 'boxen';
const error = bold.red;
import { centerText } from '@das.laboratory/cli-helpers';
import wrapAnsi from 'wrap-ansi';
import replaceAll from 'string.prototype.replaceall';
import '../data/env.js';
const cliWidth = parseInt(process.env.CLI_WIDTH);

/**
 * @param {*} realErrorCode err.code
 * @param {string} realErrorMessage err.message
 * @param {boolean} throwError false
 * @param {number} exitCode 1
 * @param {string} igorErrorCode 'SOMETHING_WENT_TOTALLY_WRONG_ERROR'
 * @param {string} igorErrorMessage 'An inexplicit something-went-wrong error occurred:'
 */
// eslint-disable-next-line max-params
function igorError(
	realErrorCode = null,
	realErrorMessage = null,
	throwError = false,
	exitCode = null,
	igorErrorCode = 'SOMETHING_WENT_TOTALLY_WRONG_ERROR',
	igorErrorMessage = 'An inexplicit "something went wrong" or "something went\ntotally wrong" error occurred:'
) {
	process.exitCode = 1;
	const igorError = new Error(igorErrorCode);
	let igorErrorString = '[IG0R.#48454C50] ' + igorErrorMessage + ' ' + igorErrorCode;

	console.log(
		centerText(
			error(
				boxen(centerText(igorErrorString, cliWidth - 10, cliWidth - 8), {
					padding: {
						top: 0,
						bottom: 0,
						left: 1,
						right: 1
					},
					borderStyle: 'single',
					dimBorder: false,
					margin: {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0
					}
				})
			),
			cliWidth - 4,
			cliWidth
		)
	);
	if (realErrorCode || realErrorMessage) {
		console.log(dim('  (You might find something actually helpful below.)\n\n'));
	}

	if (realErrorCode) {
		console.log('    Error code: ' + realErrorCode);
	}
	if (realErrorMessage) {
		realErrorMessage = replaceAll(realErrorMessage, '/homepages/3/d739241148/htdocs/', '~/');
		realErrorMessage = replaceAll(realErrorMessage, '\n        ', '\n');
		// realErrorMessage = replaceAll(realErrorMessage, '\t', '');
		realErrorMessage = replaceAll(realErrorMessage, '\n', '\n    ');

		console.log('    ' + realErrorMessage);
	}
	console.log('\n');
	if (throwError === true) {
		throw igorError;
	} else if (exitCode) {
		process.exitCode = exitCode;
		process.exit(exitCode);
	}
}
export default igorError;
