jest.mock("../src/database/tasks.repo", () => ({
	createTask: jest.fn(),
	getTaskById: jest.fn(),
	updateTask: jest.fn(),
	deleteTask: jest.fn(),
	updateTaskStatus: jest.fn(),
	getTasks: jest.fn(),
}));

const repo = require("../src/database/tasks.repo");
const service = require("../src/services/taskService");
const { STATUSES } = require("../src/constants");

describe("taskService", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	describe("addTask", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should create task and return id", async () => {
			// ARRANGE
			repo.createTask.mockResolvedValue({ id: 1 });

			// ACT
			const id = await service.addTask("Buy groceries");

			// ASSERT
			expect(id).toBe(1);
		});
		it("should pass correct arguments to repository", async () => {
			// ARRANGE
			repo.createTask.mockResolvedValue({ id: 1 });

			// ACT
			await service.addTask("Buy groceries");

			// ASSERT
			expect(repo.createTask).toHaveBeenCalledWith(
				"Buy groceries",
				STATUSES.TODO,
				expect.any(String),
				expect.any(String),
			);
		});
	});
	describe("updateTask", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should update task successfully", async () => {
			// ARRANGE
			repo.updateTask.mockResolvedValue({ id: 1 });

			// ACT
			await service.updateTask(1, "New description");

			// ASSERT
			expect(repo.updateTask).toHaveBeenCalledWith(
				1,
				"New description",
				expect.any(String),
			);
		});
		it("should throw error if task not found", async () => {
			// ARRANGE
			repo.updateTask.mockResolvedValue(null);

			// ACT / ASSERT
			await expect(service.updateTask(1, "New description")).rejects.toThrow(
				"Task with ID 1 not found",
			);
		});
	});
	describe("deleteTask", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should delete task successfully", async () => {
			// ARRANGE
			repo.deleteTask.mockResolvedValue({ id: 1 });

			// ACT
			await service.deleteTask(1);

			// ASSERT
			expect(repo.deleteTask).toHaveBeenCalledWith(1);
		});

		it("should throw error if task not found", async () => {
			// ARRANGE
			repo.deleteTask.mockResolvedValue(null);

			// ACT / ASSERT
			await expect(service.deleteTask(1)).rejects.toThrow(
				"Task with ID 1 not found",
			);
		});
	});
	describe("changeTaskStatus", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should update task status successfully", async () => {
			// ARRANGE
			repo.updateTaskStatus.mockResolvedValue({ id: 1 });

			// ACT
			await service.changeTaskStatus(1, STATUSES.DONE);

			// ASSERT
			expect(repo.updateTaskStatus).toHaveBeenCalledWith(
				1,
				STATUSES.DONE,
				expect.any(String),
			);
		});

		it("should throw error for invalid status", async () => {
			// ACT / ASSERT
			await expect(service.changeTaskStatus(1, "invalid")).rejects.toThrow(
				"Invalid status: invalid",
			);
		});

		it("should throw error if task not found", async () => {
			// ARRANGE
			repo.updateTaskStatus.mockResolvedValue(null);

			// ACT / ASSERT
			await expect(service.changeTaskStatus(1, STATUSES.DONE)).rejects.toThrow(
				"Task with ID 1 not found",
			);
		});
	});
	describe("getTasks", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it("should return tasks", async () => {
			// ARRANGE
			repo.getTasks.mockResolvedValue([{ id: 1 }]);

			// ACT
			const result = await service.getTasks({});

			// ASSERT
			expect(result).toEqual([{ id: 1 }]);
		});

		it("should pass filters to repository", async () => {
			// ARRANGE
			repo.getTasks.mockResolvedValue([]);

			const filters = {
				status: STATUSES.TODO,
				limit: 10,
				offset: 5,
				search: "milk",
			};

			// ACT
			await service.getTasks(filters);

			// ASSERT
			expect(repo.getTasks).toHaveBeenCalledWith(filters);
		});
	});
});
