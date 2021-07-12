'use strict';

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'creators',
            user: 'test-user',
            password: '3133',
            port: '5432'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds'
        },
        useNullAsDefault: true
    },

    production: {
        client: 'pg',
        connection: {
            database: 'creators',
            user: 'mars',
            password: 'hGSuf$6j7C',
            port: '5432'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        },
        useNullAsDefault: true
    }
};
