import { extname } from 'path';

function getPathType(path) {
	const extension = extname(path);

	if (extension === '.zip') {
		return '.zip';
	} else if (!extension) {
		return 'folder';
	} else {
		return 'other';
	}
}

export default getPathType;
