const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const Product_class = sequelize_mysql.define("product_class", {
    SKU: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    displayStatus:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // categories: {
    //
    // }
},{
    tableName: "product_class",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// Product_class.sync({force:true})
module.exports = Product_class
require("../Releation_Models/product_class")