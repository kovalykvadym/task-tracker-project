const logger = require("../utils/logger");
const service = require("../services/taskService");
const { VALID_STATUSES } = require("../constants");

async function listFn(args) {
	let status;

	if (args.length !== 0) {
		if (args[0].startsWith("--")) {
			status = undefined;
		} else if (VALID_STATUSES.includes(args[0])) {
			status = args[0];
			args = args.slice(1);
		} else {
			throw new Error(
				`Unknown status. Use one of: ${VALID_STATUSES.join(", ")}`,
			);
		}
	}

	const limitIndex = args.indexOf("--limit");
	let limit;

	if (limitIndex !== -1) {
		limit = parseInt(args[limitIndex + 1], 10);

		if (args[limitIndex + 1] === undefined) {
			throw new Error("Missing value for --limit");
		}

		if (Number.isNaN(limit)) {
			throw new Error("The value of limit is not a number");
		}

		if (limit < 0) {
			throw new Error("The value of `limit` cannot be less than 0");
		}
	}

	const offsetIndex = args.indexOf("--offset");
	let offset = 0;

	if (offsetIndex !== -1) {
		offset = parseInt(args[offsetIndex + 1], 10);

		if (args[offsetIndex + 1] === undefined) {
			throw new Error("Missing value for --offset");
		}

		if (Number.isNaN(offset)) {
			throw new Error("The value of offset is not a number");
		}

		if (offset < 0) {
			throw new Error("The value of `offset` cannot be less than 0");
		}
	}

	const searchIndex = args.indexOf("--search");
	let search;

	if (searchIndex !== -1) {
		search = args[searchIndex + 1];

		if (!search) {
			throw new Error("The value of search is not specified");
		}
	}

	const tasks = await service.getTasks({
		status,
		limit,
		offset,
		search,
	});

	if (tasks.length > 0) {
		tasks.forEach((task) => {
			logger.task(task.id, task.description, task.status);
		});
	} else {
		logger.info("No tasks found");
	}
}

module.exports = { listFn };
