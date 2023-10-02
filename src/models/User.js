const { DataTypes } = require("sequelize")
const { sq }= require("../configs/db")
const Card = require("../models/Card")

const User = sq.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    stripeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})


User.hasMany(Card, { as: "cards" })

Card.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
})

User.sync({ alter: true }).then(() => {
    console.log("User Model synced")
})
  
module.exports = User