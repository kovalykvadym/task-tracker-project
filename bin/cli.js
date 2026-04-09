#!/usr/bin/env node

const { add } = require("../src/commands/add");
const { list } = require("../src/commands/list");
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
	case undefined:
		// Command help
		break;
	case "add":
		// Command add
		add(args);
		break;
	case "update":
		// Command update
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
		list(args);
		break;
	default:
		// Command unknown
		console.log("Unknown command");
}
