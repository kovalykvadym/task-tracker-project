const { readTasks, writeTasks } = require("../storage/fileStorage");

async function deleteFn(args) {
	const id = Number.parseInt(args[0], 10);
	if (Number.isNaN(id)) {
		throw new Error("ID is Not A Number");
	}

	try {
		const tasks = await readTasks();

		const newTasks = tasks.filter((task) => {
			return task.id !== id;
		});

		if (tasks.length === newTasks.length) {
			console.log(`Task with ID ${id} not found`);
			return;
		}

		await writeTasks(newTasks);

		console.log("Task deleted successfully");
	} catch (err) {
		throw new Error("Unable to delete the task");
	}
}

module.exports = { deleteFn };
