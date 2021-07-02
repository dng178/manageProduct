const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const Trademark = sequelize_mysql.define("trademark", {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    country:{
        type: DataTypes.STRING
    }
},{
    tableName: "trademark",
    createdAt: "create_at",
    updatedAt: "update_at",
    })
// Trademark.sync({alter: true})
module.exports = Trademark
require("../Releation_Models/trademark")