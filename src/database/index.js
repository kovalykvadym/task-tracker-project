const { Pool } = require("pg");

const requiredEnv = ["DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT", "DB_NAME"];

for (const key of requiredEnv) {
	if (!process.env[key]) {
		throw new Error(`Missing environment variable: ${key}`);
	}
}

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
});

async function initDb() {
	try {
		const client = await pool.connect();
		await client.query("SELECT 1");
		client.release();

		console.log("Database connected successfully");
	} catch (err) {
		console.error(`Database connection failed: ${err.message}`);
		process.exit(1);
	}
}

module.exports = {
	pool,
	initDb,
};
