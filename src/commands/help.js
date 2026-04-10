const chalk = require("chalk");

function showHelp() {
	console.log(`
  ${chalk.bgCyan.black.bold(" TASK TRACKER CLI ")}
  
  ${chalk.bold("USAGE:")}
    $ task-cli ${chalk.green("<command>")} ${chalk.yellow("[options]")}
  
  ${chalk.bold("COMMANDS:")}
    ${chalk.green("add")} ${chalk.yellow("<description>")}           ${chalk.gray("- Add a new task")}
    ${chalk.green("update")} ${chalk.yellow("<id> <description>")}   ${chalk.gray("- Update an existing task")}
    ${chalk.green("delete")} ${chalk.yellow("<id>")}                 ${chalk.gray("- Delete a task")}
    ${chalk.green("mark-in-progress")} ${chalk.yellow("<id>")}       ${chalk.gray("- Mark a task as in progress")}
    ${chalk.green("mark-done")} ${chalk.yellow("<id>")}              ${chalk.gray("- Mark a task as done")}
    ${chalk.green("list")} ${chalk.yellow("[status]")}               ${chalk.gray("- List tasks (optional: todo, in-progress, done)")}
    ${chalk.green("help")}                         ${chalk.gray("- Show this help message")}

  ${chalk.bold("EXAMPLES:")}
    $ task-cli add ${chalk.gray('"Buy groceries"')}
    $ task-cli list ${chalk.cyan("in-progress")}
    $ task-cli mark-done ${chalk.magenta("1")}
    `);
}

module.exports = { showHelp };
