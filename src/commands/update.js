const { readTasks, writeTasks } = require("../storage/fileStorage");

async function updateFn(args) {
	const id = Number.parseInt(args[0], 10);
	if (Number.isNaN(id)) {
		throw new Error("ID is Not A Number");
	}

	const description = args.slice(1).join(" ").trim();

	if (!description) {
		throw new Error("Description not specified");
	}

	try {
		const tasks = await readTasks();

		const taskId = tasks.findIndex((task) => {
			return task.id === id;
		});

		if (taskId === -1) {
			console.log("Task not found");
			return;
		}

		tasks[taskId].description = description;
		tasks[taskId].updatedAt = new Date().toISOString();

		await writeTasks(tasks);

		console.log("Task updated successfully");
	} catch (err) {
		throw new Error("The task could not be updated");
	}
}

module.exports = { updateFn };
