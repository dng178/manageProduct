const Product_class = require("../Models/product_class")
const Product = require("../Models/product")
const Properties = require("../Models/property_values")

Product_class.belongsTo(Product, {
    foreignKey: "productId"
})

Product_class.belongsToMany(Properties,{
    through: "productclass_propertyval",
    foreignKey: "productClassId",
    otherKey: "propValId"
})