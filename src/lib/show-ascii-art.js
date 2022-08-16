import { clearScreen } from '@das.laboratory/cli-helpers';
import chalk from 'chalk';
import replaceAll from 'string.prototype.replaceall';
import stringWidth from 'string-width';

import asciiArt from '../data/ascii-art.js';
// import '../data/env.js';
// const cliWidth = parseInt(process.env.CLI_WIDTH);
const cliWidth = 88;

const successStyle = chalk.green;
const errorStyle = chalk.red;
const boldStyle = chalk.white;
const dimStyle = chalk.black.bold;

/**
 * Displays ASCII art, centered at a given line length.
 *
 * @param {string} art String of ASCII art to be displayed.
 * @param {boolean} doClearScreen Weather or not the clear should be cleared before showing the logo.
 * @param {number} lineLength The maximum length of the line, including text and whitespace. (default = 80)
 */
function showAsciiArt(art, doClearScreen = false, lineLength = cliWidth) {
	if (doClearScreen) {
		clearScreen();
	}
	const laboratoryChars = ['𝕯', '𝖆', '𝖘', '𝕷', '𝖆', '𝖇', '𝖔', '𝖗', '𝖆', '𝖙', '𝖔', '𝖗', '𝖞', '®'];
	let asciiArtString = '';
	let textStyle = successStyle;

	if (art.includes('fail') || art.includes('error')) {
		textStyle = errorStyle;
	}

	if (Array.isArray(asciiArt[art])) {
		// const rndInt = Math.floor(Math.random() * asciiArt[art].length) + 1;
		// asciiArtString = asciiArt[art][rndInt - 1];
		asciiArtString = asciiArt[art][5];
	} else {
		asciiArtString = asciiArt[art];
	}

	lineLength = parseInt(lineLength);
	// console.log('lineLength', lineLength);
	let logoWith = 0;
	const logoArray = asciiArtString.split('\n');
	const logoPaddedArray = [];
	for (const line in logoArray) {
		// console.log('line.length', stringWidth(logoArray[line]), logoArray[line]);
		const logoLineWidth = stringWidth(logoArray[line]);
		if (logoLineWidth > logoWith) {
			logoWith = logoLineWidth;
		}
	}

	if (lineLength + 2 < logoWith) {
		lineLength = logoWith + 2;
	}

	// console.log('lineLength', lineLength + ' | ' + 'logoWith', logoWith + ' | ' + 'padding');
	const padding = ' '.repeat((lineLength - logoWith) / 2);
	// console.log('lineLength', lineLength + ' | ' + 'logoWith', logoWith + ' | ' + 'padding', padding.length);

	for (const line in logoArray) {
		if (Object.hasOwnProperty.call(logoArray, line)) {
			logoPaddedArray[line] = padding + logoArray[line] + padding;
		}
	}

	let logoPadded = logoPaddedArray.join('\n');
	laboratoryChars.forEach(char => {
		logoPadded = replaceAll(logoPadded, char, boldStyle(char));
	});
	logoPadded = replaceAll(logoPadded, 'Herbert West', dimStyle('Herbert West'));
	console.log(textStyle(logoPadded), '\n');
}

export default showAsciiArt;
