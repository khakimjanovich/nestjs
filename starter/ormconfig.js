const dbConfig = {
  synchronize: false,
  migrations: ["migrations/*.js"],
  cli: {
    migrationsDir: "migrations"
  }
};
if (process.env.NODE_ENV === "development") {
  Object.assign(dbConfig, {
    type: "sqlite",
    synchronize: true,
    database: "db.sqlite",
    entities: ["**/*.entity.js"]
  });
} else if (process.env.NODE_ENV === "test") {
  Object.assign(dbConfig, {
    type: "sqlite",
    synchronize: true,
    database: "test.sqlite",
    entities: ["**/*.entity.ts"],
    migrationsRun: true
  });
} else if (process.env.NODE_ENV === "production") {
  //huston we have a problem here
  Object.assign(dbConfig, {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: ["**/*.entity.js"],
    ssl: false
  });
} else {
  throw new Error("Unknown error!");
}

module.exports = dbConfig;