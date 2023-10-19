const { DataTypes } = require("sequelize")
const { sq }= require("../config/db")

const Transaction = sq.define("Transaction", {
    TransactionID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    TransactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    TransactionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Transaction
