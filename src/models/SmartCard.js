const { DataTypes } = require("sequelize")
const { sq }= require("../config/db")


const SmartCard = sq.define("SmartCard", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiryMonth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiryYear: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cvc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDefault: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})

SmartCard.sync({ alter: true }).then(() => {
    console.log("Smartcard Model synced")
})

module.exports = SmartCard
