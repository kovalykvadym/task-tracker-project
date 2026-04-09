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
			try {
				const content = JSON.stringify([]);
				await fs.writeFile(tasksFile, content);
				const tasksJSON = await fs.readFile(tasksFile, { encoding: "utf8" });
				return JSON.parse(tasksJSON);
			} catch (err) {
				throw new Error(err);
			}
		}
		throw new Error(err);
	}
}

async function writeTasks(tasks) {
	try {
		const newTasks = JSON.stringify(tasks, null, 2);
		await fs.writeFile(tasksFile, newTasks);
	} catch (err) {
		throw new Error(err);
	}
}

module.exports = { readTasks, writeTasks };
