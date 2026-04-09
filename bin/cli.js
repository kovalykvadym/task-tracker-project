#!/usr/bin/env node

const { addFn } = require("../src/commands/add");
const { listFn } = require("../src/commands/list");
const { updateFn } = require("../src/commands/update");
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
	case undefined:
		// Command help
		break;
	case "add":
		// Command add
		addFn(args);
		break;
	case "update":
		// Command update
		updateFn(args);
		break;
	case "delete":
		// Command delete
		break;
	case "mark-in-progress":
		// Command mark-in-progress
		break;
	case "mark-done":
		// Command mark-done
		break;
	case "list":
		// Command list
		listFn(args);
		break;
	default:
		// Command unknown
		console.log("Unknown command");
}
