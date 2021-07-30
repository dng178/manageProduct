const Product = require("../Models/product")
const Product_class = require("../Models/product_class")
const Property_value = require("../Models/property_values")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const Properties = require("../Models/properties")
const ProductClass_PropertyVal = require("../Models/productClass_propertyVal")
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");
const sequelize = require("../Connection/sequelize_mysql");
const Product_Class = require("../Models/product_class");

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

    //c18
//get all and count product with properties values
    async getAll(req, res) {
        try {
            let body = req.body;
            let product_classId = body.product_classId
            if (!product_classId) {
                return res.json({
                    status: 0,
                    message: "class_id invalid",
                    error_code: 1
                })
            }
            if (isNaN(product_classId)) {
                return res.json({
                    status: 0,
                    message: "product class id must be an number",
                    error_code: 2
                })
            }
            let product = await Product.findOne({
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
                            exclude: ['create_at', 'update_at', 'propertiesId'],
                        },
                        through: {attributes: []},
                        include:[{
                            model: Properties,
                            attributes: {
                                exclude: ['create_at', 'update_at'],
                            },
                        }]
                    }],
                    where:{
                        id: product_classId
                    }
                }]
            })

            if (!product) {
                return res.json({
                    status: 0,
                    message: "product class not found",
                    error_code: 3
                })
            }
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
                // UPC: req.body.UPC,
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

    //c16
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
                    attributes: {exclude: ['create_at', 'update_at', 'categoryName', 'productTitle']},
                    include: [{
                        model: Property_value,
                        attributes: {
                            exclude: ['create_at', 'update_at', 'propertiesId'],
                        },
                        through: {attributes: []},
                        include:[{
                            model: Properties,
                            attributes: {
                                exclude: ['create_at', 'update_at'],
                            },
                        }]
                    }],
                }],
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

    //c14
    async createProduct(req, res) {
        let t
        try {
            t = await sequelize.transaction();
            let product = await Product.create({
                title: req.body.title,
                trademarkId: req.body.trademarkId,
                image: req.body.image,
                shortDescription: req.body.shortDescription,
                detailDescription: req.body.detailDescription,
                displayStatus: req.body.displayStatus
            }, {transaction: t});
            console.log(product.id)
            let product_class = await Product_class.create({
                productId: product.id,
                price: req.body.class[0].price,
                displayStatus: req.body.class[0].displayStatus
            }, {transaction: t})
            let productClass_PropertyVal = await ProductClass_PropertyVal.create({
                productClassId: product_class.id,
                propValId: req.body.propValId
            },{transaction: t})
            await t.commit();
            return res.json({
                status: true,
                message: "Success",
                data: [product, product_class]
            })
        } catch (err) {
            if (t) await t.rollback();
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }
}


module.exports = productController