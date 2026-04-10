const { readTasks, writeTasks } = require("../storage/fileStorage");
const { findMaxId } = require("../utils/helpers");
const { STATUSES, VALID_STATUSES } = require("../constants");

async function addTask(description) {
	const tasks = await readTasks();
	const id = findMaxId(tasks) + 1;
	const timestamp = new Date().toISOString();

	const newTask = {
		id,
		description,
		status: STATUSES.TODO,
		createdAt: timestamp,
		updatedAt: timestamp,
	};

	tasks.push(newTask);
	await writeTasks(tasks);

	return id;
}

async function updateTask(id, description) {
	const tasks = await readTasks();
	const task = tasks.find((task) => task.id === id);

	if (!task) {
		throw new Error(`Task with ID ${id} not found`);
	}

	task.description = description;
	task.updatedAt = new Date().toISOString();

	await writeTasks(tasks);
}

async function deleteTask(id) {
	const tasks = await readTasks();
	const filteredTasks = tasks.filter((task) => task.id !== id);

	if (tasks.length === filteredTasks.length) {
		throw new Error(`Task with ID ${id} not found`);
	}

	await writeTasks(filteredTasks);
}

async function changeTaskStatus(id, status) {
	if (!VALID_STATUSES.includes(status)) {
		throw new Error(`Invalid status: ${status}`);
	}

	const tasks = await readTasks();
	const task = tasks.find((task) => task.id === id);

	if (!task) {
		throw new Error(`Task with ID ${id} not found`);
	}

	task.status = status;
	task.updatedAt = new Date().toISOString();

	await writeTasks(tasks);
}

async function getTasks(statusFilter) {
	const tasks = await readTasks();
	if (!statusFilter) {
		return tasks;
	}

	return tasks.filter((task) => task.status === statusFilter);
}

module.exports = {
	addTask,
	updateTask,
	deleteTask,
	changeTaskStatus,
	getTasks,
};
