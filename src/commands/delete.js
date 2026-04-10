const logger = require("../utils/logger");
const { deleteTask } = require("../services/taskService");

async function deleteFn(args) {
	const id = Number.parseInt(args[0], 10);
	if (Number.isNaN(id)) {
		throw new Error("ID is Not A Number");
	}

	await deleteTask(id);
	logger.success(`Task ${id} deleted successfully`);
}

module.exports = { deleteFn };
