const logger = require("../utils/logger");
const service = require("../services/taskService");
const { VALID_STATUSES } = require("../constants");

async function listFn(args) {
	let statusFilter;

	if (args.length !== 0) {
		if (args[0].startsWith("--")) {
			statusFilter = undefined;
		} else if (VALID_STATUSES.includes(args[0])) {
			statusFilter = args[0];
			args = args.slice(1);
		} else {
			throw new Error(
				`Unknown status. Use one of: ${VALID_STATUSES.join(", ")}`,
			);
		}
	}

	const limitIndex = args.indexOf("--limit");
	let limitFilter;

	if (limitIndex !== -1) {
		limitFilter = parseInt(args[limitIndex + 1], 10);

		if (args[limitIndex + 1] === undefined) {
			throw new Error("Missing value for --limit");
		}

		if (Number.isNaN(limitFilter)) {
			throw new Error("The value of limit is not a number");
		}

		if (limitFilter < 0) {
			throw new Error("The value of `limit` cannot be less than 0");
		}
	}

	const offsetIndex = args.indexOf("--offset");

	let offsetFilter = 0;

	if (offsetIndex !== -1) {
		offsetFilter = parseInt(args[offsetIndex + 1], 10);

		if (args[offsetIndex + 1] === undefined) {
			throw new Error("Missing value for --offset");
		}

		if (Number.isNaN(offsetFilter)) {
			throw new Error("The value of offset is not a number");
		}

		if (offsetFilter < 0) {
			throw new Error("The value of `offset` cannot be less than 0");
		}
	}

	const tasks = await service.getTasks({
		statusFilter,
		limitFilter,
		offsetFilter,
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
