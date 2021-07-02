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
        productController.get(req, res)
    })
    app.post("/product/create", function (req, res){
        productController.post(req, res)
    })
//product from Viet Nam
    app.get("/product/vietnam", function (req, res){
        productController.getvn(req, res)
    })

    //product with clothes and makeup categories
    app.get("/product/cm", function (req, res){
        productController.getcm(req, res)
    })


    //categories
    app.get("/categories", function (req, res){
        categoriesController.get(req, res)
    })

    app.post("/categories/create", function (req, res){
        categoriesController.post(req, res)
    })

    //trademark
    app.get("/trademark", function (req, res){
        trademarkController.get(req, res)
    })

    app.post("/trademark/create", function (req, res){
        trademarkController.post(req, res)
    })

    //properties
    app.get("/property", function (req, res){
        propertiesController.get(req, res)
    })

    app.post("/property/create", function (req, res){
        propertiesController.post(req, res)
    })
    //product_class
    app.get("/proclass", function (req, res){
        proClassController.get(req, res)
    })

    app.post("/proclass/create", function (req, res){
        proClassController.post(req, res)
    })

    //count product class clothes
    app.get("/proclass/count", function (req, res){
        proClassController.getCount(req, res)
    })
    //count product class with category makeup and from korea
    app.get("/proclass/countmk", function (req, res){
        proClassController.getCountMK(req, res)
    })

}
module.exports = setRoute