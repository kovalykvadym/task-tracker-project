const { readTasks, writeTasks } = require("../storage/fileStorage");
const { findMaxId } = require("../utils/helpers");

async function add(args) {
	if (!args.join(" ")) {
		throw new Error("Description is empty");
	}

	try {
		// 1. Read tasks

		const tasksObj = await readTasks();

		// 2. Create additional variables

		const id = findMaxId(tasksObj) + 1;
		const description = args.join(" ");
		const timestamp = new Date().toISOString();

		// 3. Create new task object

		const newTask = {
			id: id,
			description: description,
			status: "todo",
			createdAt: timestamp,
			updatedAt: timestamp,
		};

		// 4. Add new task object to all other tasks

		tasksObj.push(newTask);

		// 5. Write new task in tasks.json file

		await writeTasks(tasksObj);

		// 6. Return text about successfully add task

		// Maybe change to return
		console.log(`Task added successfully (ID: ${id})`);
	} catch (err) {
		throw new Error("Error add task");
	}
}

module.exports = { add };
