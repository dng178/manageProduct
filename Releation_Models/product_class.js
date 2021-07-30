const Product_class = require("../Models/product_class")
const Product = require("../Models/product")
const Properties_values = require("../Models/property_values")

Product_class.belongsTo(Product, {
    foreignKey: "productId",
    // as: "productClass"
})

Product_class.belongsToMany(Properties_values,{
    through: "productclass_propertyval",
    foreignKey: "productClassId",
    otherKey: "propValId"
})