const Categories = require("../Models/categories")
const Product = require("../Models/product")

Categories.belongsToMany(Product, {
    through: "pro_cat",
    foreignKe: "categoriesId",
    otherKey: "productId"
})