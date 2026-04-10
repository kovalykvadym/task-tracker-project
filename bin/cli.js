#!/usr/bin/env node

const logger = require("../src/utils/logger");
const { addFn } = require("../src/commands/add");
const { listFn } = require("../src/commands/list");
const { updateFn } = require("../src/commands/update");
const { deleteFn } = require("../src/commands/delete");
const { markTask } = require("../src/commands/mark");
const { showHelp } = require("../src/commands/help");

const command = process.argv[2];
const args = process.argv.slice(3);

async function bootstrap() {
	try {
		switch (command) {
			case "add":
				await addFn(args);
				break;
			case "update":
				await updateFn(args);
				break;
			case "delete":
				await deleteFn(args);
				break;
			case "mark-in-progress":
				await markTask(args, "in-progress");
				break;
			case "mark-done":
				await markTask(args, "done");
				break;
			case "list":
				await listFn(args);
				break;
			case "help":
			case undefined:
				showHelp();
				break;
			default:
				logger.warning(
					`Unknown command: "${command}". Type "task-cli help" for usage.`,
				);
		}
	} catch (err) {
		logger.error(err.message);
		process.exit(1);
	}
}

bootstrap();
