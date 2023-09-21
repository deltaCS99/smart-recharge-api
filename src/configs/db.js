const Sequelize = require("sequelize")

const useSSL = process.env.USE_SSL === "true"

const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`, {
    dialectModule: require("pg"),
    dialectOptions: {
        ssl: useSSL && {
          require: false 
        }
    }
  })

const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}

module.exports = { sq: sequelize, dbConnection }