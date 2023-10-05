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
    expiryDate: {
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
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
})

SmartCard.belongsTo(User, {
    foreignKey: "id",
});

module.exports = SmartCard
