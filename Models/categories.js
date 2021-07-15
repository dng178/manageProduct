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
    },
    product_total: {
        type: DataTypes.VIRTUAL(),
        get() {
            let result = this.product.length;
            return result;
        },
    },
    product_class_total: {
        type: DataTypes.VIRTUAL(),
        get() {
            let count =0;
            let re = this.product.map(x => x.product_classes)
            for (let k =0; k< re.length; k++) {
                    count += re[k].length
            }
            return count;
        },
    },

},{
    freezeTableName: true,
    tableName: "categories",
    createdAt: "create_at",
    updatedAt: "update_at",
})
// Categories.sync({force: true});
module.exports = Categories
require("../Releation_Models/categories")
const sequelize = require("../Connection/sequelize_mysql");