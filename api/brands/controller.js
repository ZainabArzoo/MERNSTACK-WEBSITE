const { connect } = require("mongoose");
require("dotenv").config();
const Brand = require('./model')


const AddBrand = async (req, res) => {
    const { Brandname, Brandimage } = req.body
    try {
        await connect(process.env.MONGO_URL)

        const CheckDuplicate = await Brand.exists({ Brandname })

        if (CheckDuplicate) {

            res.json({
                message: "Brand Already Exists"
            })

        } else {

            await Brand.create({ Brandname, Brandimage })
            const Brands = await Brand.find()

            res.json({
                message: "Brand Added Successfully",
                Brands

            })
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const AllBrands = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const Brands = await Brand.find()
        res.json({
            Brands
        })
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const BrandByName = async (req, res) => {
    const { Brandname } = req.params;
    try {
        await connect(process.env.MONGO_URL)
        const Brands = await Brand.find({ Brandname })
        res.json({
            Brands
        })
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const BrandById = async (req, res) => {

    const { _id } = req.params;
    try {
        await connect(process.env.MONGO_URL)
        const Brands = await Brand.find({ _id })
        res.json({
            Brands
        })
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const UpdateBrand = async (req, res) => {
    const { Brandname, _id,Brandimage } = req.body

    const filter = { _id }
    const update = { Brandname, Brandimage}

    try {
        await connect(process.env.MONGO_URL)
        const Brands = await Brand.findOneAndUpdate(filter, update);
        res.json({
            message: "Brand Updated successfully",
            Brands
        })
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const DeleteBrand = async (req, res) => {
    const { Brandname } = req.body

    try {
        await connect(process.env.MONGO_URL)
        const Brands = await Brand.deleteOne({ Brandname })
        res.json({
            message: "Brand Deleted Successfully"
        })
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}



module.exports = { AddBrand,AllBrands, BrandById, BrandByName, UpdateBrand, DeleteBrand }




