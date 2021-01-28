module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || '172.4.1.247',
        user: process.env.DATABASE_USER || 'rootlinks',
        password: process.env.DATABASE_PASSWORD || 'Passdblinks123',
        database: process.env.DATABASE_NAME || 'db_links'
    },
    port: process.env.PORT || 4001
};