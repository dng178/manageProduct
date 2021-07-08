const Product_Class = require("../Models/product_class")
const Product = require("../Models/product")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const Property_values = require("../Models/property_values")
const Properties = require("../Models/properties")
const sequelize = require("../Connection/sequelize_mysql");

const {Op} = require("sequelize");
const {Sequelize, QueryTypes} = require("sequelize");


class proClassController {
    constructor() {
    }

    //C4
    //Get all product status hidden and categories clothes and makeup with virtual
    async getAllProductClass(req, res) {
        try {
            let product_class = await Product_Class.findAll({

                attributes: {
                    exclude: ['create_at', 'update_at'],
                },
                include: [
                    {
                        model: Product,
                        as: 'product',
                        include: [
                            {
                                model: Categories,
                                as: 'categories',
                                attributes: {
                                    exclude: ['create_at', 'update_at'],
                                },
                                through: {attributes: []}
                            }],
                    },
                    {
                        model: Property_values,
                        attributes: {exclude: ['create_at', 'update_at']},
                        through: {attributes: []},
                        include: [{
                            model: Properties,
                            attributes: {exclude: ['create_at', 'update_at']},
                        }]
                    }
                ],
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

    //Get all
    async getAll(req, res) {
        try {
            let product_class = await Product_Class.findAndCountAll({

                attributes: {
                    exclude: ['create_at', 'update_at'],
                },
                include: [
                    {
                        model: Product,
                        as: 'product',
                        include: [
                            {
                                model: Categories,
                                as: 'categories',
                                where: [{
                                    [Op.or]: [
                                        {id: req.body.category.id},
                                    ]
                                }],
                            }, {
                                model: Trademark,
                                where: [{
                                    [Op.or]: [
                                        {country: req.body.trademark.country},
                                    ]
                                }],
                            }],
                        where: {displayStatus: req.body.displayStatus}

                    },
                    {
                        model: Property_values,
                        attributes: {exclude: ['create_at', 'update_at']},
                        through: {attributes: []}
                    }
                ],


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
                "where pc.productId = p.id and pc.categoriesId = c.id and ( c.name = \"Clothes\" or c. name =\"Makeup\") and pcl.productId = p.id and pcl.displayStatus = \"hidden\"", {
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

    //get all product class and product property
    async getAllProductClassProperty(req, res) {
        try {
            let product_class = await Product_Class.findAndCountAll({
                include: [
                    {
                        model: Product,
                    },
                    {
                        model: Property_values,
                        where: {
                            id: {[Op.not]: null}
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


    //c5
    //get all and count product class with clothes category
    async getCountCategory(req, res) {
        try {
            let product = await Product_Class.findAndCountAll({
                attributes: {
                    exclude: ['create_at', 'update_at'],
                },
                distinct: true,
                include: [
                    {
                        model: Product,
                        as: "product",
                        include: [{
                            model: Categories,
                            as: "categories",
                            through: {attributes: []},
                            where: {
                                id: { [Op.in]: req.body.category_id}
                            },

                        }],
                        required: true,
                    }
                ]


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
    async getCount(req, res) {
        try {
            let product = await Product_Class.findAndCountAll({
                attributes: {
                    exclude: ['create_at', 'update_at',],
                },
                where: {displayStatus: req.body.displayStatusClass},
                include: [
                    {
                        model: Product,
                        as: 'product',
                        required: true,
                        include: [
                            {
                                model: Categories,
                                as: "categories",
                                attributes: {
                                    exclude: ['create_at', 'update_at',],
                                },
                                through: {attributes: []},
                                where: {id: req.body.category_id}
                            }, {
                                model: Trademark,
                                where: {country: req.body.country}
                            },],
                    }],

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