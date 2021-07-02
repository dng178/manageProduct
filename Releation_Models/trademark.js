const Trademark = require("../Models/trademark")
const Product = require("../Models/product")

Trademark.hasMany(Product, {
    foreignKey: "trademarkId"
})