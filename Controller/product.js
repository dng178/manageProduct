const Product = require("../Models/product")
const Product_class = require("../Models/product_class")
const Property_value = require("../Models/property_values")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");

class productController {
    constructor() {
    }

//get all and count product with clothes category and with properties values
    async getCount(req, res) {
        try {
            let product = await Product.findAndCountAll({
                attributes: {exclude: ['create_at', 'update_at']},
                distinct: true,
                include: [{
                    model: Categories,
                    as: 'categories',
                    attributes: {exclude: ['create_at', 'update_at']},
                    through: {attributes: []},
                    where: [{
                        [Op.or]: [
                            {id: req.body.category_id},
                        ]
                    }],
                    required: true,
                },
                ],
            })
            return res.json({
                status: true,
                message: "success",
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

//get all and count product with properties values
    async getAll(req, res) {
        try {
            let product = await Product.findAll({
                as: "product",
                attributes: {
                    exclude: ['create_at', 'update_at'],
                },
                include: [{
                    model: Product_class,
                    attributes: {
                        exclude: ['create_at', 'update_at', 'productTitle', 'category'],
                    },
                    include: [{
                        model: Property_value,
                        attributes: {
                            exclude: ['create_at', 'update_at'],
                        },
                        through: {attributes: []}
                    }]
                }]
            })

            return res.json({
                status: true,
                message: "success",
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


//create product
    async post(req, res) {
        try {
            let product = await Product.create({
                title: req.body.title,
                UPC: req.body.UPC,
                trademarkId: req.body.trademarkId,
                image: req.body.image,
                shortDescription: req.body.shortDescription,
                detailDescription: req.body.detailDescription,
                displayStatus: req.body.displayStatus
            });
            return res.json({
                status: true,
                message: "Success",
                data: product
            })
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //get all and count product with clothes category and with properties values
    async findbyId(req, res) {
        try {
            let product = await Product.findByPk(req.params.id, {

                attributes: {exclude: ['create_at', 'update_at']},
                include: [{
                    model: Categories,
                    as: "categories",
                    through: {attributes: []}
                }, {
                    model: Trademark,
                }, {
                    model: Product_class,
                    attributes: {exclude: ['create_at', 'update_at', 'categoryName', 'productTitle']}
                }]
            })
            return res.json({
                status: true,
                message: "success",
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
}


module.exports = productController