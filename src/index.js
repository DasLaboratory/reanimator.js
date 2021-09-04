const Client = require('ssh2-sftp-client');
const getSSHKey = require('./lib/get-ssh-key');
const askForServer = require('./lib/ask-for-server');
const servers = require('./data/servers.json');
const showHeader = require('./lib/show-header');
const showFooter = require('./lib/show-footer');

async function main() {
	console.clear();
	showHeader();
	const server = await askForServer(servers);
	const privateKey = getSSHKey(server.domain);
	const config = {
		host: server.host,
		username: server.user,
		privateKey: privateKey
	};

	let sftp = new Client();

	const list = await sftp
		.connect(config)
		.then(() => {
			return sftp.list('projects');
		})
		// .then(data => {
		// 	// console.log(data);
		// 	return data;
		// })
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
	const others = list.filter(entry => {
		if (entry.type !== 'd') {
			return true;
		}
	});

	const directoryNames = directories.map(entry => {
		return entry.name;
	});

	// console.log(directories);
	console.log(directoryNames);
	console.log(directoryNames.length);
	console.log(others);
	// console.log(list);
	showFooter();
}

main();
