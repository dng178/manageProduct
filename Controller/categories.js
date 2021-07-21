const Categories = require("../Models/categories")
const Product = require("../Models/product")
const Product_class = require("../Models/product_class")
const Properties_value = require("../Models/property_values")
const Properties = require("../Models/properties")
const sequelize = require("../Connection/sequelize_mysql");
const {Op} = require("sequelize");
const {Sequelize, QueryTypes} = require("sequelize");

class categoriesController {
    constructor() {
    }

    //C3
    //get all product in category clothes and makeup
    async getCategories(req, res) {
        try {
            let categories = await Categories.findAll({
                attributes: {exclude: ['create_at', 'update_at']},
                include: [
                    {
                        model: Product,
                        attributes: {exclude: ['create_at', 'update_at']},
                        through: {attributes: []},
                        as: "product",
                    }
                ],
                where: {
                    id: req.body.category_id
                },

            })

            return res.json({
                status: true,
                message: "Success",
                data: categories
            })
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //C11
    //get category list and total sum product and sum product class
    async getTotal(req, res) {
        try {
            let categories = await Categories.findAll({
                // as:"categories",
                include: [
                    {
                        model: Product,
                        through:{attributes:[]},
                        as: "product",
                        include:[{
                            model:Product_class,
                            attributes: {exclude: ['create_at', 'update_at']},
                            include:[{
                                model: Properties_value,
                                attributes: {exclude: ['create_at', 'update_at']},
                                through: {attributes:[]},
                                include:[{
                                    model: Properties,
                                    attributes: {exclude: ['create_at', 'update_at']},
                                }]

                            }]
                        }]
                    }
                ],
            })


            return res.json({
                status: true,
                message: "Success",
                data: categories
            })
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
            let categories = await Categories.create({
                name: req.body.name,
                picture: req.body.picture,
                detail_description: req.body.detail_description,
            })
            return res.json({
                status: true,
                message: "Success",
                data: categories
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

module.exports = categoriesController