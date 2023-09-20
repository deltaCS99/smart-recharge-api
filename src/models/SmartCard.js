const { DataTypes } = require("sequelize")
const { sq }= require("../configs/db")

const SmartCard = sq.define("SmartCard", {
    CardID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    CardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
})

module.exports = SmartCard
