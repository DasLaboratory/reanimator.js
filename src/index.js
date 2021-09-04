import Client from 'ssh2-sftp-client';
import getSSHKey from './lib/get-ssh-key.js';
import askForServer from './lib/ask-for-server.js';
import servers from './data/servers.json';
import showHeader from './lib/show-header.js';
import showFooter from './lib/show-footer.js';
import { clearScreen } from '@das.laboratory/cli-helpers';

async function main() {
	clearScreen();
	showHeader();
	const server = await askForServer(servers);
	const privateKey = getSSHKey(server.domain);
	const config = {
		host: server.host,
		username: server.user,
		privateKey: privateKey
	};

	const sftp = new Client();

	const list = await sftp
		.connect(config)
		.then(() => {
			return sftp.list('projects');
		})
		.then(data => {
			sftp.end();
			return data;
		})
		.catch(err => {
			console.error(err.message);
		});

	const directories = list.filter(entry => {
		if (entry.type === 'd') {
			return true;
		}
	});
	const files = list.filter(entry => {
		if (entry.type !== 'd') {
			return true;
		}
	});

	const directoryNames = directories
		.map(entry => {
			return entry.name;
		})
		.sort();

	const fileNames = files
		.map(entry => {
			return entry.name;
		})
		.sort();

	console.log(`\n\nFolders (${directoryNames.length}):`, directoryNames, '\n\n');
	console.log(`Files (${fileNames.length}):`, fileNames, '\n\n');

	showFooter();
}

export default main;
