require("dotenv").config();

const shouldUseSsl = () => {
  if (process.env.DB_SSL === "true") return true;
  if (process.env.DB_SSL === "false") return false;
  const url = process.env.DATABASE_URL || "";
  if (!url) return false;
  return !/localhost|127\.0\.0\.1/.test(url);
};

const dialectOptions = () => (shouldUseSsl() ? { ssl: { require: true, rejectUnauthorized: false } } : {});

const fromDatabaseUrl = () => {
  if (!process.env.DATABASE_URL) return null;
  return {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: false,
    dialectOptions: dialectOptions(),
  };
};

module.exports = {
  development: fromDatabaseUrl() || {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    dialect: "postgres",
    logging: false,
    dialectOptions: dialectOptions(),
  },
  test: fromDatabaseUrl() || {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST || process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    dialect: "postgres",
    logging: false,
    dialectOptions: dialectOptions(),
  },
  production: fromDatabaseUrl() || {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    dialect: "postgres",
    logging: false,
    dialectOptions: dialectOptions(),
  },
};
