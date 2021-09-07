// import '../data/env.js';
// const cliWidth = parseInt(process.env.CLI_WIDTH);
const cliWidth = 88;

function showCLIRuler(lineLength = cliWidth) {
	let rulerString1 = '';
	let rulerString2 = '';

	for (let index = 1; index <= lineLength; index++) {
		const rulerValue = index % 10;
		if (rulerValue === 0) {
			rulerString1 = rulerString1 + '▕';
		} else if (rulerValue === 5) {
			rulerString1 = rulerString1 + Math.floor(index / 10);
		} else if (rulerValue === 6) {
			rulerString1 = rulerString1 + 'x';
		} else {
			rulerString1 = rulerString1 + ' ';
		}
		// console.log(rulerValue + ' | ' + index / 10 + ' | ' + Math.floor(index / 10));
		rulerString2 = rulerString2 + rulerValue;
	}

	console.log(rulerString1);
	console.log(rulerString2);
	console.log(rulerString1);
}

export default showCLIRuler;
