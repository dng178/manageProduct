const Categories = require("../Models/categories")


class categoriesController {
    constructor() {
    }

    async get(req, res) {
        try {
            let categories = await Categories.findAll({

            })
            return res.json({
                data: categories
            })
        } catch (err) {
            return res.json({
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
                data: categories
            })
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }
}
module.exports = categoriesController