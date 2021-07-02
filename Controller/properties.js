const Properties_Value = require("../Models/property_values")


class propertyValController {
    constructor() {
    }

    async get(req, res) {
        try {
            let property_val = await Properties_Value.findAll({

            })
            return res.json({
                data: property_val
            })
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }

    async post(req, res) {
        try {
            let property_val = await Properties_Value.create({
                name: req.body.name,
                type: req.body.type,
            })
            return res.json({
                data: property_val
            })
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }
}
module.exports = propertyValController