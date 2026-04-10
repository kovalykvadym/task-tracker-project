# Task Tracker CLI 🚀

A simple, fast, and colorful Command Line Interface (CLI) application to manage your tasks. Built entirely with Node.js,
it uses a local JSON file to store your data, ensuring your tasks are always accessible and private.

## ✨ Features

- **Add, Update, and Delete** tasks easily from your terminal.
- **Track Status:** Mark tasks as `todo`, `in-progress`, or `done`.
- **Filter Tasks:** View all tasks or filter them by their current status.
- **Colorful Output:** Beautiful terminal UI powered by `chalk`.
- **Clean Architecture:** Built using the Separation of Concerns principle.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher is recommended)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd task-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make the CLI command globally available on your system:
   ```bash
   npm link
   ```

## 🚀 Usage

Once linked, you can use the `task-cli` command from anywhere in your terminal.

**Add a new task:**

```bash
task-cli add "Buy groceries"
```

**Update an existing task:**

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

**Delete a task:**

```bash
task-cli delete 1
```

**Change task status:**

```bash
task-cli mark-in-progress 1
task-cli mark-done 1
```

**List tasks:**

```bash
task-cli list # Shows all tasks
task-cli list done # Shows only completed tasks
task-cli list in-progress # Shows tasks currently in progress
```

## 🧪 Testing

This project uses **Jest** for unit testing the service layer. To run the tests:

```bash
npm run test
```

## 📂 Project Structure

- `bin/cli.js`: The entry point and command router.
- `src/commands/`: Handlers for each specific CLI command.
- `src/services/`: Core business logic (`taskService.js`).
- `src/storage/`: File system interaction (`fileStorage.js`).
- `tests/`: Jest unit tests.

---
*Built to learn backend architecture and Node.js CLI development.*