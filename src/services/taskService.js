const tasksRepo = require("../database/tasks.repo");
const { STATUSES, VALID_STATUSES } = require("../constants");

async function addTask(description) {
	const timestamp = new Date().toISOString();
	const { id } = await tasksRepo.createTask(
		description,
		STATUSES.TODO,
		timestamp,
		timestamp,
	);

	return id;
}

async function updateTask(id, description) {
	const updatedAt = new Date().toISOString();
	const task = await tasksRepo.updateTask(id, description, updatedAt);

	if (!task) {
		throw new Error(`Task with ID ${id} not found`);
	}
}

async function deleteTask(id) {
	const task = await tasksRepo.deleteTask(id);

	if (!task) {
		throw new Error(`Task with ID ${id} not found`);
	}
}

async function changeTaskStatus(id, status) {
	if (!VALID_STATUSES.includes(status)) {
		throw new Error(`Invalid status: ${status}`);
	}

	const updatedAt = new Date().toISOString();
	const task = await tasksRepo.updateTaskStatus(id, status, updatedAt);

	if (!task) {
		throw new Error(`Task with ID ${id} not found`);
	}
}

async function getTasks({ status, limit, offset, search }) {
	return await tasksRepo.getTasks({ status, limit, offset, search });
}

module.exports = {
	addTask,
	updateTask,
	deleteTask,
	changeTaskStatus,
	getTasks,
};
