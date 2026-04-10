const logger = require("../utils/logger");
const { addTask } = require("../services/taskService");

async function addFn(args) {
	const description = args.join(" ").trim();
	if (!description) {
		throw new Error("Description is empty. Usage: task-cli add <description>");
	}

	const id = await addTask(description);
	logger.success(`Task added successfully (ID: ${id})`);
}

module.exports = { addFn };
