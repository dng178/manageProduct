const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const Propeties = sequelize_mysql.define("properties", {
    type: {
        type: DataTypes.STRING ,
        allowNull: false,
    },

},{
    tableName: "properties",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// Propeties.sync({alter: true})
module.exports = Propeties
require("../Releation_Models/properties")