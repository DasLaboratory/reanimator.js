import igorError from './lib/igor-error.js';
// import stringWidth from 'string-width';
import { dirname } from 'path';
// import { clearScreen } from '@das.laboratory/cli-helpers';
import getSSHKey from './lib/get-ssh-key.js';
import askForServer from './inquiries/ask-for-server.js';
import servers from './data/servers.json';
import showAsciiArt from './lib/show-ascii-art.js';
import getTargetPath from './lib/get-target-path.js';
// import showCLIRuler from './lib/show-cli-ruler.js';
import './data/env.js';
import getPathType from './lib/get-path-type.js';
import makelive from './lib/makelive.js';

async function main() {
	showAsciiArt('header', true);

	let entryPath = process.argv[2] || '/projects';
	const entryPathType = getPathType(entryPath);
	let target = {};
	let domain = '';
	let server = {};

	if (entryPathType === 'other') {
		igorError(
			null,
			null,
			false,
			null,
			'USER_DOESNT_KNOW_HOW_THIS_WORKS_LOL_ERROR',
			'An explicit "you have to enter a directory or a zip file, mate" error occurred:'
		);
		showAsciiArt('failureFooter');
		process.exit(1);
	}

	if (entryPath.includes('simpleshowinteractive.com') || entryPath.includes('interactive-delivery.com')) {
		if (entryPath.includes('simpleshowinteractive.com')) {
			domain = 'simpleshowinteractive.com';
		} else if (entryPath.includes('interactive-delivery.com')) {
			domain = 'interactive-delivery.com';
		}
		entryPath = dirname(entryPath.split(domain)[1]);
		console.log(servers);
		server = servers[domain];
		console.log(domain);
		console.log(server);
	} else {
		server = await askForServer(servers);
	}

	const privateKey = getSSHKey(server.domain);
	const serverConfig = {
		host: server.host,
		username: server.user,
		privateKey: privateKey
	};

	target = await getTargetPath(serverConfig, entryPath);

	showAsciiArt('header', true);

	if (target) {
		await makelive(serverConfig, target.path, target.mode)
			.then(result => {
				// console.log('result', result);
				showAsciiArt('successFooter');
			})
			.catch(error => {
				// console.log('error', error);
				showAsciiArt('failureFooter');
			});
	} else {
		showAsciiArt('failureFooter');
	}
}

export default main;
