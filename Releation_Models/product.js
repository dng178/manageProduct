const Trademark = require("../Models/trademark")
const Product = require("../Models/product")
const Categories = require("../Models/categories")
const Product_class = require("../Models/product_class")
const ProductClass_PropertyVal = require("../Models/productClass_propertyVal")

Product.belongsTo(Trademark, {
    foreignKey: "trademarkId"
})

Product.belongsToMany(Categories, {
    through: "pro_cat",
    foreignKe: "productId",
    otherKey: "categoriesId"
})

Product.hasMany(Product_class, {
    foreignKey: "productId"
})

// Product.hasMany(ProductClass_PropertyVal, {
//     foreignKey: "prodId"
// })