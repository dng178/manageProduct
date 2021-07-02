const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const ProClass_propertyVal = sequelize_mysql.define("productClass_propertyVal", {

    productClassId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    propValId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},{
    tableName: "productClass_propertyVal",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// ProClass_propertyVal.sync({alter: true});
module.exports = ProClass_propertyVal
// require("../Releation_Models/")