const Property_values = require("../Models/properties")
const Properties = require("../Models/property_values")

Property_values.belongsTo(Properties,{
    foreignKey: "propId"
})

