const tasksRepo = require("../database/tasks.repo");
const { STATUSES } = require("../constants");

const { getCurrentTimestamp } = require("../utils/time");
const { ensureExists, validateAllowedValue } = require("../utils/validators");

const ALLOWED_STATUSES = Object.values(STATUSES);

async function addTask(description) {
	const timestamp = getCurrentTimestamp();

	const { id } = await tasksRepo.createTask({
		description,
		status: STATUSES.TODO,
		createdAt: timestamp,
		updatedAt: timestamp,
	});

	return id;
}

async function updateTask(id, description) {
	const updatedAt = getCurrentTimestamp();

	const task = await tasksRepo.updateTask({
		id,
		description,
		updatedAt,
	});

	ensureExists(task, "Task", id);
}

async function deleteTask(id) {
	const task = await tasksRepo.deleteTask({ id });

	ensureExists(task, "Task", id);
}

async function changeTaskStatus(id, status) {
	validateAllowedValue(status, ALLOWED_STATUSES, "status");

	const updatedAt = getCurrentTimestamp();

	const task = await tasksRepo.updateTaskStatus({
		id,
		status,
		updatedAt,
	});

	ensureExists(task, "Task", id);
}

async function getTasks(filters) {
	return tasksRepo.getTasks(filters);
}

module.exports = {
	addTask,
	updateTask,
	deleteTask,
	changeTaskStatus,
	getTasks,
};
