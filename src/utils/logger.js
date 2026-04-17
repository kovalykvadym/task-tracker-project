const chalk = require("chalk");

const statusColors = {
	done: chalk.green,
	"in-progress": chalk.yellow,
	todo: chalk.cyan,
};

function success(message) {
	console.log(chalk.green(message));
}

function error(message) {
	console.log(chalk.red.bold(`Error: ${message}`));
}

function warning(message) {
	console.log(chalk.yellow(message));
}

function info(message) {
	console.log(chalk.cyan(message));
}

function task(id, description, status) {
	const color = statusColors[status] || chalk.white;

	console.log(`${chalk.gray(`[${id}]`)} ${description} - ${color(status)}`);
}

module.exports = {
	success,
	error,
	warning,
	info,
	task,
};
