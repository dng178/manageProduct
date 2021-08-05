const Product = require("../Models/product")
const Product_class = require("../Models/product_class")
const Property_value = require("../Models/property_values")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const Properties = require("../Models/properties")
const ProductClass_PropertyVal = require("../Models/productClass_propertyVal")
const Pro_cat = require("../Models/pro_cat")
const {Op, where} = require("sequelize");
const sequelize = require("../Connection/sequelize_mysql");


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
                        include: [{
                            model: Properties,
                            attributes: {
                                exclude: ['create_at', 'update_at'],
                            },
                        }]
                    }],
                    where: {
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
            let product_class = await Product_class.findByPk(req.params.productId, {
                attributes: {exclude: ['create_at', 'update_at', 'displayStatus', 'price', 'productId', 'SKU', 'id']},
                include: [{
                    model: Property_value,
                    attributes: {
                        exclude: ['create_at', 'update_at', 'propertiesId'],
                    },
                    through: {attributes: []},
                    include: [{
                        model: Properties,
                        attributes: {
                            exclude: ['create_at', 'update_at'],
                        },
                    }]
                }]
            })
            return res.json({
                status: true,
                message: "success",
                data: product_class
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
            const cf = req.body.cf
            // t = await sequelize.transaction();
            let product = await Product.create({
                title: req.body.title,
                trademarkId: req.body.trademarkId,
                image: req.body.image,
                shortDescription: req.body.shortDescription,
                detailDescription: req.body.detailDescription,
                displayStatus: req.body.displayStatus
            })

        if(cf == "yes") {
            let product_class = await Product_class.create({
                productId: product.id,
                price: req.body.class[0].price,
                displayStatus: req.body.class[0].displayStatus
            })
            let product_propertyVal = await ProductClass_PropertyVal.findAll({
                where: {propValId: req.body.propValId},
            })
            let pc =[]
            const productClass_propertyVal = await req.body.propValId.map(data => data);
            console.log(productClass_propertyVal)
            await productClass_propertyVal.forEach(propId =>
                     pc = ProductClass_PropertyVal.create({
                        productClassId: product_class.id,
                        propValId: propId
                    }))
            return pc
        }

            return res.json({
                status: true,
                message: "Success",
                data: [product]
            })
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //C15
    async addProductCategories(req, res) {

        try {
            const body = req.body
            const categoriesId = body.categoriesId
            const productId = body.productId

            function isIdUnique(id, id2) {
                return Pro_cat.count({
                    where: {
                        [Op.and]: [{categoriesId: id}, {productId: id2}]
                    }
                }).then(count => {
                    if (count != 0) {
                        return false;
                    }
                    return true;
                });
            }

            // productId.forEach( (proId) =>
            //     categoriesId.forEach( (catId) =>
            // for(let proId of productId) {
            //     for (let catId of categoriesId) {
            //         isIdUnique(catId, proId).then(isUnique => {
            //             console.log(isUnique)
            //             if (isUnique) {
            //                 const pc = Pro_cat.create({
            //                     categoriesId: catId,
            //                     productId: proId
            //                 })
            //             } else {
            //                 console.log("Product ID:" + proId + " Categories ID:" + catId + " already exists")
            //             }
            //         })
            //         //     )
            //         // )
            //     }
            // }

            const promise4all = await Promise.all(
                productId.map(proId => {
                    return Promise.all(categoriesId.map(catId => {
                        isIdUnique(catId, proId).then(isUnique => {
                            console.log(isUnique)
                            if (isUnique) {
                                return Pro_cat.create({
                                    categoriesId: catId,
                                    productId: proId
                                })
                            } else {
                                return console.log("Product ID:" + proId + " Categories ID:" + catId + " already exists")
                            }
                    })
                }))
                })
            )
            return res.json({
                status: true,
                message: "Success",
                data: [productId,categoriesId]
            })
        } catch (err) {

            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //c17
    async updateProduct(req, res) {
        let t
        try {
            t = await sequelize.transaction();

            let product = await Product.update( {
                title: req.body.title,
                trademarkId: req.body.trademarkId,
            },{
                where: {
                    id: req.body.product_id,
                },
                transaction: t
            });
            let productClass = await Product_class.update( {
                price: req.body.class[0].price,
                displayStatus: req.body.class[0].displayStatus,
            },{
                where: {
                    productId: req.body.product_id
                },
                transaction: t
            });
            let pro_cat = await Pro_cat.update(
                {
                    categoriesId: req.body.proCat[0].categoriesId,
                },{
                    where: {
                        productId: req.body.product_id
                    },
                    transaction: t
                })
            let getProduct = await Product.findAll({
                where: {id: req.body.product_id},
                include: [{
                    model: Trademark,
                },{
                    model: Product_class,
                },{
                    model: Categories,
                    as: "categories",
                    through:{attributes:[]}
                }]
            })
            await t.commit();
            return res.json({
                status: true,
                message: "Success",
                data: getProduct
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