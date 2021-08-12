const Product = require("../Models/product")
const Product_class = require("../Models/product_class")
const Property_value = require("../Models/property_values")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const Properties = require("../Models/properties")
const ProductClass_PropertyVal = require("../Models/productClass_propertyVal")
const Pro_cat = require("../Models/pro_cat")
const {Op, Sequelize} = require("sequelize");
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

    //c16

    async getAll(req, res) {
        try {
            let body = req.body;
            let product_class_id = body.product_class_id
            if (!product_class_id) {
                return res.json({
                    status: 0,
                    message: "class_id invalid",
                    error_code: 1
                })
            }
            if (isNaN(product_class_id)) {
                return res.json({
                    status: 0,
                    message: "product class id must be an number",
                    error_code: 2
                })
            }
            let getProduct = await Product.findAll({
                include: [{
                    model: Product_class,
                    required: true,
                    include: [{
                        model: Property_value,
                        through: {attributes: []},
                        include: [{
                            model: Properties
                        }],
                    }],
                    where: {
                        id: product_class_id
                    }
                }, {
                    model: Categories,
                    as: "categories",
                    through: {attributes: []},
                }, {
                    model: Trademark,
                }]
            })

            var result = getProduct.map(x => x.id)
            console.log(result)
            let getAll = await Product.findAll({
                attributes: {exclude: ['create_at', 'update_at']},
                include: [{
                    model: Product_class,
                    attributes: {exclude: ['create_at', 'update_at']},
                    required: true,
                    include: [{
                        model: Property_value,
                        attributes: {exclude: ['create_at', 'update_at']},
                        through: {attributes: []},
                        include: [{
                            model: Properties,
                            attributes: {exclude: ['create_at', 'update_at']},
                        }],
                    }],
                }, {
                    model: Categories,
                    as: "categories",
                    attributes: {exclude: ['create_at', 'update_at']},
                    through: {attributes: []},
                }, {
                    model: Trademark,
                    attributes: {exclude: ['create_at', 'update_at']},
                }],
                where: {
                    id: {[Op.in]: result}
                }
            });

            if (!getAll) {
                return res.json({
                    status: 0,
                    message: "product not found",
                    error_code: 3
                })
            }
            return res.json({
                status: true,
                message: "success",
                data: getAll
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

    //c18
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

                    }],
                }],
                order: [[{model: Property_value}, {model: Properties},'id']]
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

            const product_class = await req.body.class.map(data => {
                return {
                    productId: product.id,
                    price: data.price,
                    displayStatus: data.displayStatus
                }
            });
            await Product_Class.bulkCreate(product_class);
            if (cf == "yes") {
                let get_product_class_id = (await Product_class.findAll({
                    where: {productId: product.id},
                })).map(data => data.id);

                const productClass_propertyVal = await req.body.propValId.map(data => data);

                // let count = 0
                // for (let product_class_id of get_product_class_id) {
                //     for (let proclass_property_id of productClass_propertyVal) {
                //         if (count == req.body.propValId.lenght) {
                //             break
                //         } else {
                //             await ProductClass_PropertyVal.create({
                //                 productClassId: product_class_id,
                //                 propValId: proclass_property_id
                //             })
                //             count++
                //         }
                //     }
                // }

                const arr = []
                async function isIdUnique(id, id2) {
                    return await ProductClass_PropertyVal.findOne({
                        where: {
                            [Op.and]: [{productClassId: id}, {propValId: id2}]
                        }
                    }).then(data => {
                        if (data != null) {
                            return console.log("product Class ID:" + id + " propValId:" + id2 + " already exists");
                        }
                        return arr.push({
                            productClassId: id,
                            propValId: id2
                        });

                    });
                }

                for (let product_class_id of get_product_class_id) {
                    for (let proclass_property_id of productClass_propertyVal) {
                        await isIdUnique(product_class_id, proclass_property_id)
                    }
                }

                const get_proclass_property = arr.map(data => {
                    return {
                        productClassId: data.productClassId,
                        propValId: data.propValId
                    }
                });
                const pro_class_property = await ProductClass_PropertyVal.bulkCreate(get_proclass_property);
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
            const arr = []

            async function isIdUnique(id, id2) {
                return await Pro_cat.findOne({
                    where: {
                        [Op.and]: [{categoriesId: id}, {productId: id2}]
                    }
                }).then(data => {
                    if (data != null) {
                        return console.log("Product ID:" + id2 + " Categories ID:" + id + " already exists");
                    }
                    return arr.push({
                        product_id: id2,
                        category_id: id
                    });

                });
            }

                for (let proId of productId) {
                    for (let catId of categoriesId) {
                        await isIdUnique(catId, proId)
                    }
                }

            const get_pro_class = arr.map(data => {
                return {
                    productId: data.product_id,
                    categoriesId: data.category_id
                }
            });
            const pro_cat = await Pro_cat.bulkCreate(get_pro_class);

            // const promise4all = await Promise.all(
            //     productId.map(proId => {
            //         return Promise.all(categoriesId.map(catId => {
            //             isIdUnique(catId, proId).then(isUnique => {
            //                 console.log(isUnique)
            //                 if (isUnique) {
            //                     return Pro_cat.create({
            //                         categoriesId: catId,
            //                         productId: proId
            //                     })
            //                 } else {
            //                     return console.log("Product ID:" + proId + " Categories ID:" + catId + " already exists")
            //                 }
            //             })
            //         }))
            //     })
            // )

            return res.json({
                status: true,
                message: "Success",
                data: pro_cat
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
            let body = req.body;
            let product_id = body.product_id
            let trademark_id = body.trademarkId
            let category_id = body.categoriesId
            let title = body.title
            let price = body.class[0].price
            let displayStatus = body.class[0].displayStatus
            if (!product_id) {
                return res.json({
                    status: 0,
                    message: "product_id invalid",
                    error_code: 1
                })
            }
            if (!trademark_id) {
                return res.json({
                    status: 0,
                    message: "trademark id is invalid",
                    error_code: 2
                })
            }

            if (isNaN(product_id) || isNaN(trademark_id)) {
                return res.json({
                    status: 0,
                    message: "id must be an number",
                    error_code: 4
                })
            }

            if (!title) {
                return res.json({
                    status: 0,
                    message: "product title invalid",
                    error_code: 3
                })
            }
            if (!price) {
                return res.json({
                    status: 0,
                    message: "class_id invalid",
                    error_code: 2
                })
            }

            if (!displayStatus) {
                return res.json({
                    status: 0,
                    message: "display status is invalid",
                    error_code: 3
                })
            }

            if (isNaN(price)) {
                return res.json({
                    status: 0,
                    message: "price must be an number",
                    error_code: 5
                })
            }

            if (displayStatus != "available" && displayStatus != "hidden") {
                return res.json({
                    status: 0,
                    message: "display status must be available or hidden",
                    error_code: 5
                })
            }
            t = await sequelize.transaction();
            let product = await Product.update({
                title: title,
                trademarkId: trademark_id,
            }, {
                where: {
                    id: product_id,
                },
                transaction: t
            });
            const find_product_class = await Product_Class.findAll({
                where: {productId: product_id},
                transaction: t
            })
            const getCount = await Product_Class.count({
                where: {productId: product_id},
                transaction: t
            })
            if (getCount > 1) {
                const getId = find_product_class.map(x => x.id)
                let count = 0
                for (let id of getId) {
                    if (count == req.body.class.length) {
                        break;
                    } else {
                        await Product_class.update({
                            price: req.body.class[count].price,
                            displayStatus: req.body.class[count].displayStatus
                        }, {
                            where: {
                                id: id
                            },
                            transaction: t
                        })
                        count++
                    }
                }
            } else {
                const product_class2 = await Product_class.update({
                    price: price,
                    displayStatus: displayStatus
                }, {
                    where: {
                        productId: product_id
                    },
                    transaction: t
                })
            }
            const find_pro_cat = await Pro_cat.findAll({
                where: {
                    productId: product_id
                },
                transaction: t
            })
            const get_pro_cat_id = find_pro_cat.map(x => x.id)
            let count = 0
            for (let pro_cat_id of get_pro_cat_id) {
                if (count == req.body.cat.lenght) {
                    break
                } else {
                    await Pro_cat.update({
                        categoriesId: req.body.cat[count].categoriesId
                    }, {
                        where: {
                            id: pro_cat_id
                        },
                        transaction: t
                    })
                    count++
                }

            }

            let getProduct = await Product.findAll({
                where: {id: product_id},
                include: [{
                    model: Trademark,
                }, {
                    model: Product_class,
                }, {
                    model: Categories,
                    as: "categories",
                    through: {attributes: []}
                }],
                transaction: t
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