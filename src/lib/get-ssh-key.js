const fs = require('fs');
const os = require('os');
const homedir = os.homedir();

function getSSHKey(server) {
	const privateKey = fs.readFileSync(homedir + '/.ssh/' + server, 'utf8');
	return privateKey;
}

module.exports = getSSHKey;
