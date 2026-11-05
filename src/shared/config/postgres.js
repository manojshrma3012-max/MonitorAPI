import { Pool } from "pg";

import config from "./index.js";
import logger from "./logger.js";

class PostgresConnection {
    constructor() {
        this.pool = null;
    }

    getPool() {
        if (!this.pool) {
            this.pool = new Pool({
                connectionString: config.postgres.connectionString,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 5000,
            });

            this.pool.on("error", (err) => {
                logger.error("Unexpected PG pool error", err);
            });

            logger.info("PostgreSQL pool created");
        }

        return this.pool;
    }

    async testConnection() {
        try {
            const result = await this.getPool().query("SELECT NOW()");

            logger.info(
                `PostgreSQL connected successfully at ${result.rows[0].now}`
            );
        } catch (error) {
            logger.error("Failed to connect to PostgreSQL", error);
            throw error;
        }
    }

    async query(text, params = []) {
        const start = Date.now();

        try {
            const result = await this.getPool().query(text, params);

            logger.debug("Executed query", {
                text,
                duration: Date.now() - start,
                rows: result.rowCount,
            });

            return result;
        } catch (error) {
            logger.error("Query error", { text, error });
            throw error;
        }
    }

    async close() {
        if (this.pool) {
            await this.pool.end();
            this.pool = null;

            logger.info("PostgreSQL pool closed");
        }
    }
}
export default new PostgresConnection();