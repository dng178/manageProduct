const Categories = require("../Models/categories")
const Product = require("../Models/product")
const {Op} = require("sequelize");

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