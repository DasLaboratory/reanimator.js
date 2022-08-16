import { filter } from 'fuzzy';
import { prompt, registerPrompt } from 'inquirer';
import { sortBy } from 'lodash';

registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

export default async function (projects) {
	let projectOptions = projects.map(el => {
		return {
			name: el.beautyfiedName,
			value: el
		};
	});
	projectOptions = sortBy(projectOptions, function (i) {
		return i.name.toLowerCase();
	});

	projectOptions.unshift({
		name: '.. go to parent directory.',
		value: {
			type: 'd',
			name: '..',
			beautyfiedName: '..'
		}
	});

	projectOptions.unshift({
		name: '✅ Select this folder.',
		value: {
			type: 'd',
			selected: true,
			name: './',
			beautyfiedName: '📁 ' + './'
		}
	});

	const project = await prompt([
		{
			type: 'autocomplete',
			name: 'project',
			suggestOnly: false,
			message: 'Please select a zip file or a folder...',
			source: (answers, input) => {
				input = input || '';
				return new Promise(function (resolve) {
					var options = {
						extract: function (el) {
							return el.name;
						}
					};
					var fuzzyResult = filter(input, projectOptions, options);
					resolve(
						fuzzyResult.map(function (el) {
							return el.original;
						})
					);
				});
			},
			pageSize: 20,
			validate(choice, answers) {
				// console.log('answers:', answers);
				// console.log('choice:', choice.value.type);
				if (choice.value.type === 'd') {
					return true;
				} else if (choice.value.type === '.zip') {
					choice.value.selected = true;
					return true;
				} else {
					return 'THE FILE TYPE ' + choice.value.type.toUpperCase() + ' IS NOT SUPPORTED.';
				}
			}
		}
	]).then(answers => {
		return answers.project;
	});
	return project;
}
