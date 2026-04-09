const { readTasks } = require("../storage/fileStorage");

const correctArgs = {
	undefined: "undefined",
	todo: "todo",
	"in-progress": "in-progress",
	done: "done",
};

async function listFn(args) {
	try {
		if (!Object.hasOwn(correctArgs, args[0])) {
			console.log("Unknown arguments");
			return;
		}
		const tasksObj = await readTasks();

		const tasks = tasksObj.filter((task) => {
			if (args[0] === undefined) {
				return task;
			}
			return task.status === args[0];
		});

		if (tasks.length > 0) {
			tasks.forEach((task) => {
				console.log(`[${task.id}] ${task.description} - ${task.status}`);
			});
		} else {
			console.log("No tasks found");
		}
	} catch (err) {
		throw new Error("Error view list task");
	}
}

module.exports = { listFn };
