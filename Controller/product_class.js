const Product_Class = require("../Models/product_class")
const Product = require("../Models/product")
const Categories = require("../Models/categories")
const Trademark = require("../Models/trademark")
const Property_values = require("../Models/property_values")
const Properties = require("../Models/properties")
const sequelize = require("../Connection/sequelize_mysql");

const {Op} = require("sequelize");
const {Sequelize, QueryTypes} = require("sequelize");

// const { body, validationResult  } = require('express-validator/check')

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
                // as: "productClass",
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
                                id: {[Op.in]: req.body.category_id},
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
                id: req.body.id,
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

    //c7
    //raw query
    //get all and count product
    async getCountProductRaw(req, res) {
        try {
            // let product = await Product_Class.findAndCountAll({
            // attributes: {
            //     exclude: ['create_at', 'update_at'],
            // },
            // distinct: true,
            // include: [
            //     {
            //         model: Product,
            //         as: "product",
            //         include: [{
            //             model: Categories,
            //             as: "categories",
            //             // attributes:{exclude:['product_Total','product_Class_Total'], include:['id', 'name', 'picture', 'detail_description']},
            //             attributes: {
            //                 include:[[Sequelize.literal('SELECT pc.id\n' +
            //                     'FROM product_class AS pc \n' +
            //                     'inner JOIN \n' +
            //                     'product AS p ON pc.productId = p.id \n' +
            //                     'inner JOIN ( pro_cat AS pcat\n' +
            //                     'inner JOIN categories AS c \n' +
            //                     'ON c.id = pcat.categoriesId) \n' +
            //                     'ON p.id = pcat.productId and ( c.id = 1 or c.id = 3)'), 'pc.id']]
            //             },
            //             through: {attributes: []},
            //
            //         }],
            //     }
            // ],
            // where: {
            //     displayStatus: req.body.displayStatus,
            // },
            let product_class = await sequelize.query("SELECT p.*, c.*, pc.*\n" +
                "FROM product_class AS pc \n" +
                "inner JOIN \n" +
                "product AS p ON pc.productId = p.id \n" +
                "inner JOIN ( pro_cat AS pcat\n" +
                "inner JOIN categories AS c \n" +
                "ON c.id = pcat.categoriesId) \n" +
                "ON p.id = pcat.productId\n" +
                "WHERE pc.displayStatus = :displayStatus  and pc.id in (SELECT product_class.id\n" +
                "FROM product_class  \n" +
                "inner JOIN \n" +
                "product  ON product_class.productId = product.id \n" +
                "inner JOIN ( pro_cat \n" +
                "inner JOIN categories \n" +
                "ON categories.id = pro_cat.categoriesId) \n" +
                "ON product.id = pro_cat.productId and ( categories.id in (:id)));", {
                type: QueryTypes.SELECT,
                replacements: {
                    displayStatus: req.body.displayStatus,
                    id: req.body.category_id
                }

            })
            return res.json({
                status: true,
                message: "Success",
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

    async getCountProduct(req, res) {
        try {
            let getCategory = await Product_Class.findAll({
                attributes: ["id"],
                include: [{
                    model: Product,
                    as: "product",
                    required: true,
                    attributes: ['id'],
                    include: [{
                        model: Categories,
                        as: "categories",
                        attributes: ['id'],
                        through: {attributes: []},
                        where: {
                            id: req.body.category_id
                        }
                    }],
                    where: {
                        displayStatus: req.body.displayStatus
                    }
                }]
            })

            var result = getCategory.map(x => x.id)
            console.log(result)
            let getCount = await Product_Class.findAndCountAll({
                distinct: true,
                include: [{
                    model: Product,
                    as: "product",
                    include: [{
                        model: Categories,
                        as: "categories",
                        attributes: {exclude: ['product_total', 'product_class_total']},
                        through: {attributes: []},
                    }],
                }],
                where: {
                    id: {[Op.in]: result}
                }
            });
            return res.json({
                status: true,
                message: "Success",
                data: [getCount]
            });
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //c8
    async getPage(req, res) {
        try {
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);
            const offset = page ? (page - 1) * limit : 0;
            let product = Product_Class.findAndCountAll({limit: limit, offset: offset})
                .then(data => {
                    const response = {
                        message: "page = " + page + ", limit = " + limit,
                        data: {
                            "totalItems": data.count,
                            "totalPages": Math.ceil(data.count / limit),
                            "limit": limit,
                            "offset": offset,
                            "currentPageNumber": page,
                            "currentPageSize": data.rows.length,
                            "Product": data.rows,
                        }
                    };
                    res.send(response);
                });
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //c9

    // async getProductClassPage(req, res) {
    //     try {
    //         let page = parseInt(req.query.page);
    //         let limit = parseInt(req.query.limit);
    //         const offset = page ? (page - 1) * limit : 0;
    //         const id = req.body.category_id;
    //         const displayStatus = req.body.displayStatus;
    //         let getCategory = await Product_Class.findAndCountAll({
    //             attributes: ["id"],
    //             include: [{
    //                 model: Product,
    //                 as: "product",
    //                 required: true,
    //                 attributes: ['id'],
    //                 include: [{
    //                     model: Categories,
    //                     as: "categories",
    //                     attributes: ['id'],
    //                     through: {attributes: []},
    //                 }],
    //             }],
    //         })
    //
    //         let product_class = await Product_Class.findAndCountAll({
    //             distinct: true,
    //             limit: limit,
    //             offset: offset,
    //             include: [{
    //                 model: Product,
    //                 as: "product",
    //                 required: true,
    //                 include: [{
    //                     model: Categories,
    //                     as: "categories",
    //                     through: {attributes: []},
    //                 }],
    //             }],
    //             replacements: [id, displayStatus],
    //
    //             where: {
    //                 [Op.and]: Sequelize.literal('exists (SELECT product_class.id\n' +
    //                     'FROM pro_cat as pcat \n' +
    //                     'inner JOIN \n' +
    //                     'categories as c ON pcat.categoriesId = c.id  where\n' +
    //                     'product.id = pcat.productId and ( c.id in (?)) and product_class.displayStatus = ?)')
    //             }
    //         }).then(data => {
    //             const response = {
    //                 message: "page = " + page + ", limit = " + limit,
    //                 data: {
    //                     "totalItems": data.count,
    //                     "totalPages": Math.ceil(data.count / limit),
    //                     "limit": limit,
    //                     "offset": offset,
    //                     "currentPageNumber": page,
    //                     "currentPageSize": data.rows.length,
    //                     "product_class": data.rows,
    //
    //                 }
    //             };
    //             res.send(response);
    //         });
    //     } catch (err) {
    //         return res.json({
    //             status: false,
    //             message: "Exception",
    //             exception: err.message
    //         })
    //     }
    // }

    async getProductClassPage(req, res) {
        try {
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);
            const offset = page ? (page - 1) * limit : 0;
            const id = req.body.category_id;
            // const displayStatus = req.body.displayStatus;
            let getCategory = await Product_Class.findAll({
                include: [{
                    model: Product,
                    as: "product",
                    required: true,
                    // include: [{
                    //     model: Categories,
                    //     as: "categories",
                    //     through: {attributes: []},
                    // }],
                }],
                replacements: [id],
                where: {
                    [Op.in]: Sequelize.literal('exists (SELECT product_class.id\n' +
                        'FROM pro_cat as pcat \n' +
                        'inner JOIN \n' +
                        'categories as c ON pcat.categoriesId = c.id  where\n' +
                        'product.id = pcat.productId and ( c.id in (?)))')
                    ,
                    displayStatus: req.body.displayStatus
                }

            })
            var result = Object.keys(getCategory).map(k => getCategory[k].id)
            let product_class = await Product_Class.findAndCountAll({
                distinct: true,
                limit: limit,
                offset: offset,
                include: [{
                    model: Product,
                    as: "product",
                    required: true,
                    include: [{
                        model: Categories,
                        as: "categories",
                        through: {attributes: []},
                    }],
                }],
                where: {
                    id: {[Op.in]: result}
                }

            }).then(data => {
                const response = {
                    message: "page = " + page + ", limit = " + limit,
                    data: {
                        "totalItems": data.count,
                        "totalPages": Math.ceil(data.count / limit),
                        "limit": limit,
                        "offset": offset,
                        "currentPageNumber": page,
                        "currentPageSize": data.rows.length,
                        "product_class": data.rows,

                    }
                };
                res.send(response);
            });
        } catch (err) {
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //C10
    async createBulk(req, res) {
        try {
            // const data = req.body.data
            // for (var i = 0; i < data.length; i++) {
            //     console.log(i)
            //     console.log(req.body.data[i]);
            //     let product_class = await Product_Class.create([{
            //         productId: req.body.data[i].productId,
            //         price: req.body.data[i].price,
            //         displayStatus: req.body.data[i].displayStatus
            //     },
            //     ])
            // }
            const product_class = req.body.data.map(data => {
                return {
                    productId: data.productId,
                    price: data.price,
                    displayStatus: data.displayStatus
                }
            });
            await Product_Class.bulkCreate(product_class);
            return res.json({
                status: true,
                message: "Success",
                data: product_class
            })

        } catch (err) {
            console.log(err)
            return res.json({
                status: false,
                message: "Exception",
                exception: err.message
            })
        }
    }

    //c12
    async updateProductClass(req, res) {
        let t
        try {
            let body = req.body;
            let class_id = body.class_id;
            let class_price = body.price;
            let class_displayStatus = body.displayStatus;
            if (!class_id) {
                return res.json({
                    status: 0,
                    message: "class_id invalid",
                    error_code: 1
                })
            }

            if (!class_price) {
                return res.json({
                    status: 0,
                    message: "class_id invalid",
                    error_code: 2
                })
            }

            if (!class_displayStatus) {
                return res.json({
                    status: 0,
                    message: "class_id invalid",
                    error_code: 3
                })
            }

            if (isNaN(class_id)) {
                return res.json({
                    status: 0,
                    message: "class_id must be an number",
                    error_code: 4
                })
            }

            if (isNaN(class_price)) {
                return res.json({
                    status: 0,
                    message: "price must be an number",
                    error_code: 5
                })
            }

            if (class_displayStatus != "available" && class_displayStatus != "hidden") {
                return res.json({
                    status: 0,
                    message: "display status must be available or hidden",
                    error_code: 5
                })
            }

            t = await sequelize.transaction();
            let find_class = await Product_Class.findOne({where: {id: class_id}, transaction: t})

            if (!find_class) {
                return res.json({
                    status: 0,
                    message: "find_class not found",
                    error_code: 7
                })
            }

            let product_class = await Product_Class.update({
                price: class_price,
                displayStatus: class_displayStatus
            }, {
                where: {
                    id: find_class.id
                }, transaction: t,
            });

            let list_product_class = await Product_Class.findAll({
                where: {
                    productId: find_class.productId
                },
                transaction: t
            })

            if (!list_product_class) {
                return res.json({
                    status: 0,
                    message: "list_product_class not found",
                    error_code: 8
                })
            }
            const isHidden = (product_class) => product_class.displayStatus == "hidden";
            const isAvailable = (product_class) => product_class.displayStatus == "available";
            if (list_product_class.every(isHidden) == true) {
                await Product.update({
                    displayStatus: "hidden"
                }, {where: {id: list_product_class[0].productId}, transaction: t})
            } else if (list_product_class.every(isAvailable) == true) {
                await Product.update({
                    displayStatus: "available"
                }, {where: {id: list_product_class[0].productId}, transaction: t})
            }
            await t.commit();
            return res.json({
                status: true,
                message: "Success",
                data: list_product_class
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

    async getSearch(req, res) {

        try {

            let getCategory = await Product_Class.findAll({
                include: [{
                    model: Product,
                    as: "product",
                    required: true,
                    include: [{
                        model: Categories,
                        as: "categories",
                        through: {attributes: []},
                        where: {
                            id: req.body.category_id
                        }
                    }],
                    where: {
                        [Op.or]: [
                            {title: {[Op.like]: '%' + req.body.searchQuery + '%'}}
                        ]
                    }
                }],
                where: {
                    displayStatus: req.body.displayStatus,
                    [Op.or]: [
                        {SKU: {[Op.like]: `%${req.body.searchQuery1}%` }}
                    ]

                }
            })

            return res.json({
                status: true,
                message: "Success",
                data: [getCategory]
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


module.exports = proClassController