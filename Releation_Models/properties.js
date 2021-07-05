const Property_values = require("../Models/property_values")
const Properties = require("../Models/property_values")
const ProductClass = require("../Models/product_class")

Properties.hasMany(Property_values,{
    foreignKey: "propertiesId"
})

Properties.belongsToMany(ProductClass,{
    through: "productclass_propertyval",
    foreignKey: "propValId",
    otherKey: "productClassId"
})

