const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: "postgres",
    dialect: "postgres"
  });

const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}

module.exports = { sq: sequelize, dbConnection }