const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const Categories = sequelize_mysql.define("categories", {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    detail_description:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: "categories",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// Categories.sync({force: true});
module.exports = Categories
require("../Releation_Models/categories")