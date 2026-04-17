#!/usr/bin/env node

const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../.env") });

const { warning, error } = require("../src/utils/logger");
const { pool, initDb } = require("../src/database/index");

const { addFn } = require("../src/commands/add");
const { updateFn } = require("../src/commands/update");
const { deleteFn } = require("../src/commands/delete");
const { markFn } = require("../src/commands/mark");
const { listFn } = require("../src/commands/list");
const { showHelp } = require("../src/commands/help");

const command = process.argv[2];
const args = process.argv.slice(3);

async function bootstrap() {
	await initDb();

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
				await markFn(args, "in-progress");
				break;
			case "mark-done":
				await markFn(args, "done");
				break;
			case "list":
				await listFn(args);
				break;
			case "help":
			case undefined:
				showHelp();
				break;
			default:
				warning(
					`Unknown command: "${command}". Type "task-cli help" for usage.`,
				);
		}
	} catch (err) {
		error(err.message);
		process.exit(1);
	}
}

bootstrap().then(() => pool.end());
