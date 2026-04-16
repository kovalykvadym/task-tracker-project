# Task Tracker CLI 🚀

A simple, fast, and colorful Command Line Interface (CLI) application to manage your tasks.
Built with Node.js and powered by a PostgreSQL database (Docker-based setup included).

This project demonstrates clean backend architecture principles, including separation of concerns, layered design, and
database integration.

---

## ✨ Features

- **Task Management:** Add, update, and delete tasks directly from your terminal
- **Status Tracking:** Mark tasks as `todo`, `in-progress`, or `done`
- **Filtering:** List all tasks or filter by status
- **Colorful CLI Output:** Enhanced UX using `chalk`
- **Persistent Storage:** PostgreSQL database with Docker support
- **Clean Architecture:** Command → Service → Repository pattern

---

## 🧱 Architecture

The project follows a layered architecture:

```text
CLI (commands)
↓
Service Layer (business logic)
↓
Repository Layer (data access)
↓
PostgreSQL (database)
```

---

## 🛠️ Prerequisites

- Node.js (v14 or higher recommended)
- Docker & Docker Compose

---

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

3. Create .env file
   ```bash
   cp .env.example .env
   ```
4. Start PostgreSQL with Docker:
   ```bash
   docker-compose up -d
   ```
5. Make the CLI command globally available on your system:
   ```bash
   npm link
   ```

---

## 🗄️ Database Setup

- The database is automatically initialized via:
   ```bash
   db/01-create-table.sql
   ```
- Docker mounts this file and runs it on first startup

---

## 🚀 Usage

Once linked, you can use the `task-cli` command from anywhere in your terminal.

**➕ Add a task**

```bash
task-cli add "Buy groceries"
```

**✏️ Update a task**

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

**❌ Delete a task**

```bash
task-cli delete 1
```

**🔄 Change status**

```bash
task-cli mark-in-progress 1
task-cli mark-done 1
```

**📋 List tasks**

```bash
task-cli list # Shows all tasks
task-cli list done # Shows only completed tasks
task-cli list in-progress # Shows tasks currently in progress
```

---

## 🧪 Testing

This project uses **Jest** for unit testing the service layer. To run the tests:

   ```bash
   npm run test
   ```

---

## 📂 Project Structure

```text
task-tracker-cli/
│
├── bin/
│ └── cli.js # CLI entry point (command router)
│
├── db/
│ └── 01-create-table.sql # Database schema initialization
│
├── src/
│ ├── commands/ # CLI command handlers
│ │ ├── add.js
│ │ ├── delete.js
│ │ ├── help.js
│ │ ├── list.js
│ │ ├── mark.js
│ │ └── update.js
│ │
│ ├── database/ # Data access layer (PostgreSQL)
│ │ ├── index.js # DB connection (pg Pool)
│ │ └── tasks.repo.js # Repository (SQL queries)
│ │
│ ├── services/ # Business logic layer
│ │ └── taskService.js
│ │
│ ├── utils/ # Helpers & utilities
│ │ └── logger.js
│ │
│ └── constants.js # Shared constants (statuses, etc.)
│
├── .env.example # Environment variables template
├── .gitignore
├── biome.json # Linter / formatter config
├── docker-compose.yml # PostgreSQL + services setup
├── package.json # Project metadata & dependencies
├── package-lock.json
└── README.md # Project documentation
```

---

## ⚙️ Environment Variables

Example .env:

```text
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_tracker
```

---

## 🚀 Future Improvements

- Pagination (list --limit --offset)
- Search (list --search)
- REST API version (Express)
- Migrations system
- Authentication (for multi-user support)

---

## 📌 Notes

- Uses parameterized queries to prevent SQL injection
- Follows Separation of Concerns
- Designed as a learning project for backend development

---

## 🧠 Author Goal

This project was built to practice:

- Node.js backend development
- CLI application design
- Database integration (PostgreSQL)
- Clean architecture principles

---

Built as a stepping stone toward Junior / Intern Backend Developer role 💻