import { Select } from 'enquirer';

async function askForServer(servers) {
	const domains = Object.keys(servers).map(server => {
		return servers[server].domain;
	});

	const prompt = new Select({
		name: 'server',
		message: 'Pick a server',
		choices: domains
	});

	return prompt
		.run()
		.then(answer => {
			return servers[answer];
		})
		.catch(console.error);
}

export default askForServer;
