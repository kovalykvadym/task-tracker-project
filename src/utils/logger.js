const chalk = require("chalk");
const { STATUSES } = require("../constants");

const logger = {
	success: (message) => {
		console.log(chalk.green(`${message}`));
	},

	error: (message) => {
		console.log(chalk.red.bold(`Error: ${message}`));
	},

	warning: (message) => {
		console.log(chalk.yellow(`${message}`));
	},

	info: (message) => {
		console.log(chalk.cyan(`${message}`));
	},

	task: (id, description, status) => {
		let statusBadge;
		if (status === STATUSES.DONE) {
			statusBadge = chalk.green(status);
		} else if (status === STATUSES.IN_PROGRESS) {
			statusBadge = chalk.yellow(status);
		} else {
			statusBadge = chalk.cyan(status);
		}

		console.log(`${chalk.gray(`[${id}]`)} ${description} - ${statusBadge}`);
	},
};

module.exports = logger;
