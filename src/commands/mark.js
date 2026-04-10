const logger = require("../utils/logger");
const { changeTaskStatus } = require("../services/taskService");

async function markTask(args, status) {
	const id = Number.parseInt(args[0], 10);
	if (Number.isNaN(id)) {
		throw new Error("ID is Not A Number");
	}

	await changeTaskStatus(id, status);
	logger.success(`Task ${id} marked as ${status}`);
}

module.exports = { markTask };
