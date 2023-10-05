const { DataTypes } = require("sequelize")
const { sq }= require("../config/db")

const Card = sq.define("Card", {
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
    cardName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDefault: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})

module.exports = Card
