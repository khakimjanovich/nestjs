const dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations'
    }
}
if (process.env.NODE_ENV === 'development') {
    Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'db.sqlite',
        entities: ['**/*.entity.js'],
    })
} else if (process.env.NODE_ENV === 'test') {
    Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'test.sqlite',
        entities: ['**/*.entity.ts'],
        migrationsRun: true,
    })
} else if (process.env.NODE_ENV === 'production') {
    Object.assign(dbConfig, {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        migrations: true,
        entities: ['**/*.entity.js'],
        ssl: {
            rejectUnauthorized: false
        }
    })
} else {
    throw new Error('Unknown error!')
}

module.exports = dbConfig