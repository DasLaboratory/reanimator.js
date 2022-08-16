import Client from 'ssh2-sftp-client';

import igorError from './igor-error.js';

async function getRemoteFileInfo(serverData, path) {
	const sftp = new Client();

	return await sftp
		.connect(serverData)
		.then(() => {
			return sftp.stat(path);
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

export default getRemoteFileInfo;
