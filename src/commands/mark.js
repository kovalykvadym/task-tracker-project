const logger = require("../utils/logger");
const service = require("../services/taskService");

async function markFn(args, status) {
	const id = Number.parseInt(args[0], 10);
	if (Number.isNaN(id)) {
		throw new Error("ID is Not A Number");
	}

	await service.changeTaskStatus(id, status);
	logger.success(`Task ${id} marked as ${status}`);
}

module.exports = { markFn };
