import { extname } from 'path';

function parseRemoteFolderContent(folderContent) {
	const directories = folderContent.filter(entry => {
		if (entry.type === 'd') {
			return true;
		}
	});

	const directoriesSorted = directories.sort((a, b) => (a.name > b.name ? 1 : -1));

	const files = folderContent.filter(entry => {
		if (entry.type !== 'd') {
			return true;
		}
	});

	const filesSorted = files.sort((a, b) => (a.name > b.name ? 1 : -1));

	const directoriesSortedBeautified = directoriesSorted.map(entry => {
		entry.beautyfiedName = '📁 ' + entry.name;
		return entry;
	});

	const filesSortedBeautified = filesSorted.map(entry => {
		if (extname(entry.name) === '.zip') {
			entry.beautyfiedName = '📦 ' + entry.name;
		} else {
			entry.beautyfiedName = '📄 ' + entry.name;
		}
		entry.type = extname(entry.name);
		return entry;
	});

	filesSortedBeautified.forEach(file => {
		directoriesSortedBeautified.push(file);
	});

	return directoriesSortedBeautified;
}

export default parseRemoteFolderContent;
