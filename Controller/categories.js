const Categories = require("../Models/categories")
const Product = require("../Models/product")
const { Op } = require("sequelize");

class categoriesController {
    constructor() {
    }

    //C3
    //get all product in category clothes and makeup
    async getAllCategories(req, res) {
        try {
            let categories = await Categories.findAll({
                attributes:["id", "name", "detail_description"],
                    include:{
                        model: Product,
                        as: "product",

                        through:{attributes:['categoriesId']},
                        required: true,
                    },
                where:{
                        name: {
                            [Op.or]: ["Clothes", "Makeup"]
                        }
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