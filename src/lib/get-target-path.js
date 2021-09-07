import { extname, normalize } from 'path';
import getRemoteFolderContent from './get-remote-folder-content.js';
import parseRemoteFolderContent from './parse-remote-folder-content.js';
import chooseProject from '../inquiries/choose-project.js';
import showAsciiArt from './show-ascii-art.js';
import getPathType from './get-path-type.js';
import getRemotePathInfo from './get-remote-path-info.js';

async function getTargetPath(serverConfig, entryPath, selected = false) {
	showAsciiArt('header', true);
	const entryPathType = getPathType(entryPath);

	if (entryPathType === '.zip') {
		let target = {};
		if (!selected) {
			target = await getRemotePathInfo(serverConfig, entryPath);
		}
		target.type = '.zip';
		target.mode = 'file';
		target.path = normalize(entryPath);
		return target;
	} else if (entryPathType === 'folder') {
		console.log('📍 YOU ARE HERE:', entryPath, '\n');
		const folderContent = await getRemoteFolderContent(serverConfig, entryPath);
		const parsedFolderContent = parseRemoteFolderContent(folderContent);
		const target = await chooseProject(parsedFolderContent);

		const normalizedChosenPath = normalize(entryPath + '/' + target.name);

		if (target.type === 'd' && target.selected === true) {
			target.path = normalizedChosenPath;
			target.mode = 'auto';
		} else if (target.type === 'd') {
			return await getTargetPath(serverConfig, normalizedChosenPath);
		} else if (target.type === '.zip') {
			return await getTargetPath(serverConfig, normalizedChosenPath, true);
		} else {
			console.log('THE FILE TYPE ' + target.type.toUpperCase() + ' IS NOT SUPPORTED.');
			return await getTargetPath(serverConfig, entryPath);
		}
		// showAsciiArt('header', true);

		return target;
	}
}

export default getTargetPath;
