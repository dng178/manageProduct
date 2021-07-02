const Trademark = require("../Models/trademark")


class trademarkController {
    constructor() {
    }

    async get(req, res) {
        try {
            let trademark = await Trademark.findAll({

            })
            return res.json({
                data: trademark
            })
        } catch (err) {
            return res.json({
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
                data: trademark
            })
        } catch (err) {
            return res.json({
                exception: err.message
            })
        }
    }
}
module.exports = trademarkController