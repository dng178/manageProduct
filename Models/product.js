const {Sequelize, DataTypes} = require("sequelize");
const sequelize_mysql = require("../Connection/sequelize_mysql")

const Product = sequelize_mysql.define("product", {
    title:{
        type: DataTypes.STRING,
        allowNull: false,

    },
    UPC: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        unique: true,
    },
    trademarkId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    shortDescription:{
        type: DataTypes.TEXT('tiny'),
        allowNull: false
    },
    detailDescription:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    displayStatus:{
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    freezeTableName: true,
    tableName: "product",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// Product.sync({force: false})
module.exports = Product
require("../Releation_Models/product")