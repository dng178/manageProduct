const Product_Class = require("../Models/product_class")
const Product = require("../Models/product")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const Property_values = require("../Models/property_values")
const sequelize = require("../Connection/sequelize_mysql");
const { Op } = require("sequelize");
const {Sequelize, QueryTypes} = require("sequelize");


class proClassController {
    constructor() {
    }

    async getAllProductClass(req, res) {
        try {
            let product_class = await Product_Class.findAll({
                // include: Product,
                attributes:['productTitle','id']
            })
            return res.json({
                status: true,
                message: "Success",
                data: product_class
            })
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

//C4 raw query
    async getAllProductClassCategoryTitle(req, res) {
        try {
            let product_class = await sequelize.query("\n" +
                "SELECT pcl.id, pcl.SKU, p.title, pcl.price, c.name, pcl.displayStatus  FROM product as p, categories as c, pro_cat as pc, product_class as pcl \n" +
                "where pc.productId = p.id and pc.categoriesId = c.id and ( c.name = \"Clothes\" or c. name =\"Makeup\") and pcl.productId = p.id and pcl.displayStatus = \"hidden\"",{
                    type: QueryTypes.SELECT
                })
                // include:{
                //     model: Product
                // }

            return res.json({
                status: true,
                message: "Success",
                data: product_class
            })
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    // async getAllProductClassCategoryTitle(req, res) {
    //     try {
    //         let product_class = await Product_Class.findAll({
    //             attributes: {
    //                 include: [[
    //                     Sequelize.literal('SELECT p.title  FROM product as p'), "title"
    //                 ]]
    //             }
    //         })
    //
    //         return res.json({
    //             status: true,
    //             message: "Success",
    //             data: product_class
    //         })
    //     } catch (err) {
    //         return res.json({
    //             status: false,
    //             message: "Exception",
    //             exception: err.message
    //         })
    //     }
    // }

    //c4 without same row
    //get all and count product class with clothes category
    async getClotheCategory(req, res) {
        try {
            let product = await Product_Class.findAndCountAll({
                attributes:["SKU", "price","displayStatus"],

                include:{
                    model: Product,
                    as: "product",
                    attributes:["title"],
                    include:{
                      model: Categories,
                        as:"categories",
                           attributes: ["name"],
                        through:{attributes:[]},
                        where:{
                            name: {[Op.or]: ["Clothes","Makeup"]}
                        },
                    },
                    required: true,
                },
            })

            return res.json({
                status: true,
                message: "Success",
                data: product
            });
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //get all product class and product property
    async getAllProductClassProperty(req, res) {
        try {
            let product_class = await Product_Class.findAndCountAll({
                include:[
                    {
                        model:Product,
                    },
                    {
                        model: Property_values,
                        where:{
                            id:{[Op.not]: null}
                        }
                    }
                ]

            })
            return res.json({
                status: true,
                message: "Success",
                data: product_class
            })
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //get all and count product class with clothes category
    async getCountClotheCategory(req, res) {
        try {
            let product = await Product_Class.count({

                    model: Product,
                    include:{
                        model: Categories,
                        where:{name: "Clothes"}
                    }

            })
            return res.json({
                status: true,
                message: "Success",
                data: product
            });
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //C6
    //get all and count product class with makeup category and from korea
    async getCountMakeupClothesKorea(req, res) {
        try {
            let product = await Product_Class.findAndCountAll({
                    include:
                        {
                            model: Product,
                            where: {displayStatus: "hidden"},
                            include: [
                                {model: Trademark, attributes: ["country"], where: {country: "Korea"}},
                                {
                                    model: Categories,
                                    as: "categories",
                                    attributes: ["name"],
                                    where: {name: "Makeup"}
                                }]
                        },
            })
            return res.json({
                status: true,
                message: "Success",
                data: product
            });
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
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
                status: true,
                message: "Success",
                data: product_class
            })
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }
}
module.exports = proClassController