const Product = require("../Models/product")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const { Op } = require("sequelize");

class productController {
    constructor() {}

//get all and count product with clothes category
    async get(req, res) {
        try {
            let product = await Product.findAndCountAll({
                attributes:["id", "title", "UPC","shortDescription","detailDescription", "displayStatus"],
                include:{
                    model: Categories,
                    attributes:["name", "picture", "detail_description"],
                    through: { attributes: [] },
                    where:{
                        name: "Clothes"
                    },
                    required: true,
                }
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

    //get all product from VN
    async getvn(req, res) {
        try {
            let product = await Product.findAll({
                attributes:["id", "title", "UPC","shortDescription","detailDescription", "displayStatus"],
                include:{
                    model: Trademark,
                    attributes:["name", "country", "logo"],
                    where:{
                        country: "Vietnamese"
                    },
                    required: true,
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

    //get all product with clothes and makeup category
    async getcm(req, res) {
        try {
            let product = await Product.findAndCountAll({

                attributes:["id", "title", "UPC","shortDescription","detailDescription", "displayStatus"],
                include:[{
                    model: Categories,
                    attributes:["name", "picture", "detail_description"],
                    through: { attributes: [] },
                    where:{
                        // name: {
                        //     // [Op.or]: ["Clothes", "Makeup"]
                        // }
                        [Op.or]:[
                            {name: "Clothes"},
                            {name: "Makeup"}
                        ]
                    },
                    required: true,
                }]

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
                data: product
            })
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }
}
module.exports = productController