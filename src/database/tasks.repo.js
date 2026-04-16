const pool = require("./index.js");

async function createTask(description, status, createdAt, updatedAt) {
	const queryText = `
		INSERT INTO tasks (description, status, created_at, updated_at) 
		VALUES ($1, $2, $3, $4) 
		RETURNING *
	`;
	const values = [description, status, createdAt, updatedAt];

	const res = await pool.query(queryText, values);

	return res.rows[0];
}

async function getTasks(limit, offset) {
	const queryText = `
		SELECT *
		FROM tasks
		LIMIT $1
		OFFSET $2
	`;
	const values = [limit, offset];

	const res = await pool.query(queryText, values);

	return res.rows;
}

async function getTasksByStatus(status, limit, offset) {
	const queryText = `
		SELECT *
		FROM tasks
		WHERE status = $1
		LIMIT $2
		OFFSET $3
	`;
	const values = [status, limit, offset];

	const res = await pool.query(queryText, values);
	await pool.end();

	return res.rows;
}

async function updateTask(id, description, updatedAt) {
	const queryText = `
		UPDATE tasks
		SET description = $2, updated_at = $3
		WHERE id = $1
		RETURNING *
	`;
	const values = [id, description, updatedAt];

	const res = await pool.query(queryText, values);

	return res.rows[0];
}

async function updateTaskStatus(id, status, updatedAt) {
	const queryText = `
		UPDATE tasks
		SET status = $2, updated_at = $3
		WHERE id = $1
		RETURNING *
	`;
	const values = [id, status, updatedAt];

	const res = await pool.query(queryText, values);

	return res.rows[0];
}

async function deleteTask(id) {
	const queryText = `
		DELETE FROM tasks
		WHERE id = $1
		RETURNING *
	`;
	const values = [id];

	const res = await pool.query(queryText, values);

	return res.rows[0];
}

module.exports = {
	createTask,
	getTasks,
	getTasksByStatus,
	updateTask,
	updateTaskStatus,
	deleteTask,
};
