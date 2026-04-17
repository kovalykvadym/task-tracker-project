const pool = require("./index.js");

async function query(text, params) {
	return pool.query(text, params);
}

async function createTask({ description, status, createdAt, updatedAt }) {
	const queryText = `
		INSERT INTO tasks (description, status, created_at, updated_at)
		VALUES ($1, $2, $3, $4)
		RETURNING *
	`;

	const values = [description, status, createdAt, updatedAt];

	const res = await query(queryText, values);
	return res.rows[0];
}

async function getTasks({ status, limit, offset, search }) {
	let queryText = `
		SELECT *
		FROM tasks
	`;

	const values = [];
	const conditions = [];

	if (status != null) {
		values.push(status);
		conditions.push(`status = $${values.length}`);
	}

	if (search != null) {
		values.push(`%${search}%`);
		conditions.push(`LOWER(description) LIKE LOWER($${values.length})`);
	}

	if (conditions.length) {
		queryText += ` WHERE ${conditions.join(" AND ")}`;
	}

	if (limit != null) {
		values.push(limit);
		queryText += ` LIMIT $${values.length}`;
	}

	if (offset != null) {
		values.push(offset);
		queryText += ` OFFSET $${values.length}`;
	}

	const res = await query(queryText, values);
	return res.rows;
}

async function updateTask({ id, description, updatedAt }) {
	const queryText = `
		UPDATE tasks
		SET description = $2, updated_at = $3
		WHERE id = $1
		RETURNING *
	`;

	const values = [id, description, updatedAt];

	const res = await query(queryText, values);
	return res.rows[0];
}

async function updateTaskStatus({ id, status, updatedAt }) {
	const queryText = `
		UPDATE tasks
		SET status = $2, updated_at = $3
		WHERE id = $1
		RETURNING *
	`;

	const values = [id, status, updatedAt];

	const res = await query(queryText, values);
	return res.rows[0];
}

async function deleteTask({ id }) {
	const queryText = `
		DELETE FROM tasks
		WHERE id = $1
		RETURNING *
	`;

	const res = await query(queryText, [id]);
	return res.rows[0];
}

module.exports = {
	createTask,
	getTasks,
	updateTask,
	updateTaskStatus,
	deleteTask,
};
