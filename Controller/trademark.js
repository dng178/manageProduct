const Trademark = require("../Models/trademark")
const Product = require("../Models/product")

class trademarkController {
    constructor() {
    }

    //C2
    //Get all product from Viet Nam
    async getAllTrademarkVietNam(req, res) {
        try {
            let trademark = await Trademark.findAll({
                where:{
                    country: "Vietnamese"
                },
                include: {
                    model: Product,
                    // attributes: ["id", "title", "UPC", "shortDescription", "detailDescription", "displayStatus"]
                }
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