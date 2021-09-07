/* eslint-disable no-caller */
import { NodeSSH } from 'node-ssh';
import { dirname, basename } from 'path';
// import terminalLink from 'terminal-link';
// import { box, log } from './cli-style';
// import { header } from '@das.laboratory/cli-helpers';
import align from 'wide-align';
import boxen from 'boxen';
import chalk from 'chalk';
import getPathType from './get-path-type.js';
import igorError from './igor-error.js';

import '../data/env.js';
const cliWidth = parseInt(process.env.CLI_WIDTH);

function pbcopy(data) {
	var proc = require('child_process').spawn('pbcopy');
	proc.stdin.write(data);
	proc.stdin.end();
}

async function makelive(serverConfig, path, mode) {
	const linksArray = [];
	const pathType = getPathType(path);
	let remoteFolderPath = '';
	let remoteFileName = '';
	const makeliveArguments = [];

	if (pathType === 'folder') {
		remoteFolderPath = path;
	} else if (pathType === '.zip') {
		remoteFileName = basename(path);
		remoteFolderPath = dirname(path);
	}

	console.log(
		'\n' +
			chalk.green(
				boxen(align.center(chalk.white('Reanimating the live link...'), cliWidth - 2), {
					borderStyle: 'round'
					// borderColor: 'green'
				})
			) +
			'\n'
	);

	if (pathType === '.zip') {
		console.log(' SELECTED:\n');
		console.log('    📁  ' + remoteFolderPath);
		console.log('    📦  ' + remoteFileName + '\n\n');
		console.log(' MODE:\n');
		console.log('    🎯  ' + mode + '\n\n');
		makeliveArguments.push('--force', remoteFileName);
	} else {
		console.log(' SELECTED:\n');
		console.log('    📁  ' + remoteFolderPath + '\n\n');
		console.log(' MODE:\n');
		console.log('    🌟  ' + mode + '\n\n');
		makeliveArguments.push('--auto');
	}

	const ssh = new NodeSSH();

	return await ssh.connect(serverConfig).then(async function () {
		return await ssh
			.exec('~/_tools/ssi-server-scripts/makelive.sh', makeliveArguments, {
				cwd: '.' + remoteFolderPath,
				stream: 'stdout',
				options: { pty: true }
			})
			.then(function (result) {
				let foundTheLinks = false;
				result.split('\n').map(line => {
					if (line.includes('https://')) {
						linksArray.push(line.trim().replace('   ', '  ').split(': ')[1]);
						foundTheLinks = true;
					}
				});
				if (foundTheLinks) {
					console.log(' LINKS:\n');
					console.log('    🕹️   ' + linksArray[0]);
					console.log('    💾  ' + linksArray[1]);
					if (process.platform === 'darwin') {
						pbcopy(linksArray[0]);
						console.log(chalk.dim('        (The live link was copied to your clipboard.)'));
					}
				} else {
					console.log(result);
				}
				console.log('\n');
				// const mailSubject = encodeURIComponent('🔥 ' + siData.title + ' | Links 🔥');
				// 					const mailBody = encodeURIComponent(`Hi!

				// Here are some extremely fresh links for the following project:

				// ────────────────────────────────────────
				// Customer: ${siData.customer}
				// Title:    ${siData.project}
				// Language: ${siData.language}
				// Output:   ${siData.output}
				// ────────────────────────────────────────

				// ${linksArray[0]}

				// ${linksArray[1]}

				// Enjoy!
				// `);
				// 					const mailToString = 'mailto:?subject=' + mailSubject + '&body=' + mailBody;
				// 					const mailLink = terminalLink('Command-click here to send an email!', mailToString);
				// 					log(mailLink, '1-envelope');
				// 					// console.log('\n');
				// 					// console.log('  Command-click here to send an email!\n');
				// 					// console.log(mailToString);
				// 					// console.log('\n');
				// 					done();
				ssh.dispose();
				return true;
			})
			.catch(error => {
				ssh.dispose();
				igorError(error.code, error.message, true);

				// return error;
			});
		// return true;
	});
}

export default makelive;
