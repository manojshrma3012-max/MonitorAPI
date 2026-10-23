import dotenv from "dotenv";
dotenv.config();
const config = {
    node_env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || "5000", 10),
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/api_monitoring',
    },
    postgres: {
        database: process.env.PG_DATABASE || 'api_monitoring',
        url : process.env.POSTGRES_SQL_URL 
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL ,
        queue: process.env.RABBITMQ_QUEUE,
        publisherConfirms: process.env.RABBITMQ_PUBLISHER_CONFIRMS === 'true' || false, // MSGS LOST 
        retryAttempts: parseInt(process.env.RABBITMQ_RETRY_ATTEMPTS || '3', 10),
        retryDelay: parseInt(process.env.RABBITMQ_RETRY_DELAY || '1000', 10),
    },

    jwt: {
        secret: process.env.JWT_SECRET ,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },

}

export default config;