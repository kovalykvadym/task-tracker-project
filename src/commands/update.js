const logger = require("../utils/logger");
const { updateTask } = require("../services/taskService");

async function updateFn(args) {
	const id = Number.parseInt(args[0], 10);
	if (Number.isNaN(id)) {
		throw new Error("ID is Not A Number");
	}

	const description = args.slice(1).join(" ").trim();
	if (!description) {
		throw new Error("Description not specified");
	}

	await updateTask(id, description);
	logger.success(`Task ${id} updated successfully`);
}

module.exports = { updateFn };
