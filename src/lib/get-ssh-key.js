import { readFileSync } from 'fs';
import { homedir } from 'os';

function getSSHKey(server) {
	const privateKey = readFileSync(homedir + '/.ssh/' + server, 'utf8');
	return privateKey;
}

export default getSSHKey;
