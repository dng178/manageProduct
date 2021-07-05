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

    //product
    app.get("/product",function (req, res){
        productController.getAll(req, res)
    })
    app.post("/product/create", function (req, res){
        productController.post(req, res)
    })


    //categories
    app.get("/categories/ClotheMakeup", function (req, res){
        categoriesController.getAllCategories(req, res)
    })

    app.post("/categories/create", function (req, res){
        categoriesController.post(req, res)
    })

    //trademark Viet Nam
    app.get("/trademark/VietNam", function (req, res){
        trademarkController.getAllTrademarkVietNam(req, res)
    })

    app.post("/trademark/create", function (req, res){
        trademarkController.post(req, res)
    })

    //properties
    app.get("/property", function (req, res){
        propertiesController.getAllProperty(req, res)
    })

    app.post("/property/create", function (req, res){
        propertiesController.post(req, res)
    })
    //product_class
    app.get("/proclass", function (req, res){
        proClassController.getAllProductClass(req, res)
    })

    app.get("/proclass/property", function (req, res){
        proClassController.getAllProductClassProperty(req, res)
    })

    app.post("/proclass/create", function (req, res){
        proClassController.post(req, res)
    })

    //C4 raw query
    app.get("/proclass/sub", function (req, res){
        proClassController.getAllProductClassCategoryTitle(req, res)
    })

    //C4 without same row
    app.get("/proclass/c4", function (req, res){
        proClassController.getClotheCategory(req, res)
    })

    //count product class clothes
    app.get("/proclass/count", function (req, res){
        proClassController.getCountClotheCategory(req, res)
    })
    //count product class with category makeup and from korea
    app.get("/proclass/countMakeupKorea", function (req, res){
        proClassController.getCountMakeupClothesKorea(req, res)
    })

}
module.exports = setRoute