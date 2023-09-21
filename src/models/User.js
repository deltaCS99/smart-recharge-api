const { DataTypes } = require("sequelize")
const { sq }= require("../configs/db")

const User = sq.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

User.sync({ alter: true }).then(() => {
    console.log("User Model synced")
})
  
module.exports = User