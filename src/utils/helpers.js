function findMaxId(tasks) {
	if (tasks.length === 0) {
		return 0;
	}

	const ids = tasks.map((task) => {
		return task.id;
	});

	return Math.max(...ids);
}

module.exports = { findMaxId };
