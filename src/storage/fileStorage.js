const fs = require("node:fs/promises");
const path = require("node:path");

const tasksFile = path.join(__dirname, "..", "..", "tasks.json");

async function readTasks() {
	try {
		await fs.access(tasksFile);
		const tasksJSON = await fs.readFile(tasksFile, { encoding: "utf8" });
		return JSON.parse(tasksJSON);
	} catch (err) {
		if (err.code === "ENOENT") {
			await fs.writeFile(tasksFile, "[]");
			return [];
		}
		throw err;
	}
}

async function writeTasks(tasks) {
	const newTasks = JSON.stringify(tasks, null, 2);
	await fs.writeFile(tasksFile, newTasks);
}

module.exports = { readTasks, writeTasks };
