import Client from 'ssh2-sftp-client';
import igorError from './igor-error.js';

async function getRemoteFolderContent(serverData, path) {
	const sftp = new Client();

	return await sftp
		.connect(serverData)
		.then(() => {
			return sftp.list(path);
		})
		.then(data => {
			sftp.end();
			return data;
		})
		.catch(err => {
			igorError(err.code, err.message, false, 1);
			sftp.end();
			return false;
		});
}

export default getRemoteFolderContent;
