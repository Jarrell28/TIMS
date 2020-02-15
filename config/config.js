module.exports = {
    development: {
        username: "root",
        password: "",
        database: "employee_db",
        port: 3306,
        host: "127.0.0.1",
        dialect: 'mysql'
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    },
    production: {
        "use_env_variable": "JAWSDB_URL",
        dialect: 'mysql'
    }
}