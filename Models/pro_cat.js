const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const ProCat = sequelize_mysql.define("pro_cat", {
    productId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    categoriesId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }

},{
    freezeTableName: true,
    tableName: "pro_cat",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// ProCat.sync({force: false});
module.exports = ProCat
// require("../Releation_Models/")