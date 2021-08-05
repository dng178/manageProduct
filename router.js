const ProductController = require("./Controller/product")
const CategoriesController = require("./Controller/categories")
const TrademarkController = require("./Controller/trademark")
const PropertiesController = require("./Controller/properties")
const ProClassController = require("./Controller/product_class")

let productController = new ProductController()
let categoriesController = new CategoriesController()
let trademarkController = new TrademarkController()
let propertiesController = new PropertiesController()
let proClassController = new ProClassController()


function setRoute(app) {

    //c18
    //product
    app.get("/product/all", function (req, res) {
        productController.getAll(req, res)
    })

    app.post("/product/create", function (req, res) {
        productController.createProduct(req, res)
    })

    //c16
    //find by Id
    app.get("/product/:productId",function (req, res){
        productController.findbyId( req, res)
    })

    app.post("/product/addCategories",function (req, res){
        productController.addProductCategories( req, res)
    })

    app.put("/product/update",function (req, res){
        productController.updateProduct( req, res)
    })

    //C1
    app.get("/product/count", function (req, res) {
        productController.getCount(req, res)
    })

    //categories
    app.get("/categories", function (req, res) {
        categoriesController.getCategories(req, res)
    })

    //c11
    app.get("/categories/total", function (req, res) {
        categoriesController.getTotal(req, res)
    })

    app.post("/categories/create", function (req, res) {
        categoriesController.post(req, res)
    })

    //trademark
    app.get("/trademark", function (req, res) {
        trademarkController.getTrademark(req, res)
    })

    app.post("/trademark/create", function (req, res) {
        trademarkController.post(req, res)
    })

    //properties
    app.get("/property", function (req, res) {
        propertiesController.getAllProperty(req, res)
    })

    app.post("/property/create", function (req, res) {
        propertiesController.post(req, res)
    })

    //product_class

    app.get("/product_class/all", function (req, res) {
        proClassController.getAll(req, res)
    })

    // app.get("/product_class", function (req, res) {
    //     proClassController.getAllProductClass(req, res)
    // })

    app.get("/product_class/property", function (req, res) {
        proClassController.getAllProductClassProperty(req, res)
    })

    app.post("/product_class/create", function (req, res) {
        proClassController.post(req, res)
    })



    //C4 raw query
    app.get("/product_class/sub", function (req, res) {
        proClassController.getAllProductClassCategoryTitle(req, res)
    })

    //count product class clothes
    app.get("/product_class/category", function (req, res) {
        proClassController.getCountCategory(req, res)
    })

    //c7
    //count product
    app.get("/product_class/product", function (req, res) {
        proClassController.getCountProduct(req, res)
    })

    //count product class with category makeup and from korea
    app.get("/product_class/count", function (req, res) {
        proClassController.getCount(req, res)
    })

    //c8
    app.get("/product_class", function (req, res) {
        proClassController.getPage(req, res)
    })

    app.get("/product_class/page", function (req, res) {
        proClassController.getProductClassPage(req, res)
    })

    //c10
    app.post("/product_class/create_bulk", function (req, res) {
        proClassController.createBulk(req, res)
    })

    //c12
    app.put("/product_class/update", function (req, res) {
        proClassController.updateProductClass(req, res)
    })

    //c13
    app.get("/product_class/search", function (req, res) {
        proClassController.getSearch(req, res)
    })

    //
}

module.exports = setRoute