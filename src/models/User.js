const { DataTypes } = require("sequelize")
const { sq }= require("../config/db")
const SmartCard = require("./SmartCard")

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


User.hasMany(SmartCard, { as: "smartcards" })

SmartCard.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
})

User.sync({ alter: true }).then(() => {
    console.log("User Model synced")
})
  
module.exports = User