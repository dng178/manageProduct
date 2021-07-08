const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const Property_values = sequelize_mysql.define("property_values", {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    propertiesId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }

},{
    tableName: "property_values",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// Property_values.sync({alter: true})
module.exports = Property_values
require("../Releation_Models/property_values")