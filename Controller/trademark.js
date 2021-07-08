const Trademark = require("../Models/trademark")
const Product = require("../Models/product")
const Product_class = require("../Models/product_class");
const Property_value = require("../Models/property_values")
const {Op} = require("sequelize");

class trademarkController {
    constructor() {
    }

    //C2
    //Get all product from trademark
    async getTrademark(req, res) {
        try {
            let trademark = await Trademark.findAll({
                where: {
                    country: req.body.country
                },
                include: [{
                    model: Product,
                    attributes: {
                        exclude: ['create_at', 'update_at'],
                    },
                    include: [{
                        model: Product_class,
                        attributes: {
                            exclude: ['create_at', 'update_at', 'productTitle', 'categoryName'],
                        },
                        include: [{
                            model: Property_value,
                            attributes: {
                                exclude: ['create_at', 'update_at'],
                            },
                            through: {attributes: []}
                        }]
                    }]
                }]
            })
            return res.json({
                status: true,
                message: "Success",
                data: trademark
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
            let trademark = await Trademark.create({
                name: req.body.name,
                logo: req.body.logo,
            })
            return res.json({
                status: true,
                message: "Success",
                data: trademark
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

module.exports = trademarkController