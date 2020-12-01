module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'rootlinks',
        password: process.env.DATABASE_PASSWORD || '89javier',
        database: process.env.DATABASE_NAME || 'Passdblinks123'
    },
    port: process.env.PORT || 2000
};