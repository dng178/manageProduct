const Property_values = require("../Models/property_values")
const Properties = require("../Models/properties")

Property_values.belongsTo(Properties,{
    foreignKey: "propertiesId"
})

