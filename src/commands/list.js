const logger = require("../utils/logger");
const { VALID_STATUSES } = require("../constants");
const { getTasks } = require("../services/taskService");

async function listFn(args) {
	const statusFilter = args[0];

	if (statusFilter && !VALID_STATUSES.includes(statusFilter)) {
		throw new Error(`Unknown status. Use one of: ${VALID_STATUSES.join(", ")}`);
	}

	const tasks = await getTasks(statusFilter);

	if (tasks.length > 0) {
		tasks.forEach((task) => {
			logger.task(task.id, task.description, task.status);
		});
	} else {
		logger.info("No tasks found");
	}
}

module.exports = { listFn };
