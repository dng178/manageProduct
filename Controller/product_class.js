const Product_Class = require("../Models/product_class")
const Product = require("../Models/product")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")

const { Op } = require("sequelize");

class proClassController {
    constructor() {
    }

    async get(req, res) {
        try {
            let product_class = await Product_Class.findAll({

            })
            return res.json({
                data: product_class
            })
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }



    //get all and count product class with clothes category
    async get(req, res) {
        try {
            let product = await Product_Class.findAndCountAll({
                attributes:["SKU", "price","displayStatus"],

                include:{
                    model: Product,
                    attributes:["title"],
                    include:{
                      model: Categories,
                           attributes: ["name"],
                        where:{
                            name: {[Op.or]: ["Clothes","Makeup"]}
                        },
                    },

                    required: true,
                },
            })

            return res.json({
                data: product
            });
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }


    //get all and count product class with clothes category
    async getCount(req, res) {
        try {
            let product = await Product_Class.count({

                    model: Product,
                    include:{
                        model: Categories,
                        where:{name: "Clothes"}
                    }

            })
            return res.json({
                data: product
            });
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }


    //get all and count product class with makeup category and from korea
    async getCountMK(req, res) {
        try {
            let product = await Product.findAndCountAll({
                    include: [
                        {model: Product_Class, where:{displayStatus: "hidden"}},
                        {model: Trademark, attributes: ["country"], where: {country: "Korea"}},
                        {model: Categories,through:["productId","categoriesId"] ,attributes: ["name"], where: {name: "Makeup"}},
                    ],
            })
            return res.json({
                data: product
            });
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }

    async post(req, res) {
        try {
            let product_class = await Product_Class.create({
                SKU: req.body.SKU,
                productId: req.body.productId,
                propertiesId: req.body.propertiesId,
                price: req.body.price,
                displayStatus: req.body.displayStatus
            })
            return res.json({
                data: product_class
            })
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }
}
module.exports = proClassController