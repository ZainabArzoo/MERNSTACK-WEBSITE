const { connect } = require("mongoose");
require("dotenv").config();
const Product = require('./model')


const AddProduct = async (req, res) => {
    const { name,images,description,category,price,rating,thumbnail,brand  } = req.body

    try {
        await connect(process.env.MONGO_URL)
        const CheckDuplicate = await Product.exists({ name })
        if (CheckDuplicate) {
            res.json({
                message: "Product Already Exists"
            })
        } else {
            await Product.create({ name,images,description,category,price,rating,thumbnail,brand  })

            res.json({
                message: "Product Added Successfully",

            })
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const AllProducts = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const products = await Product.find()
        res.json({
            products
        })
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const UpdateProduct = async (req, res) => {
    const { name,images,description,category,price,rating,thumbnail,_id ,brand } = req.body

    const filter = {_id}
    const target = {name,images,description,category,price,rating,thumbnail,brand }

    try {
        await connect(process.env.MONGO_URL)
        const products = await Product.findOneAndUpdate(filter,target)
        res.json({
            message: "product Updated successfully"
        })
    } 
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const DeleteProduct = async (req, res) => {
    const { name } = req.body

    try {
        await connect(process.env.MONGO_URL)
        const products = await Product.deleteOne({ name })
        res.json({
            message: "Product Deleted Successfully"
        })
    } 
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const ProductByName = async (req, res) => {
    const { name } = req.params;
    try {
      await connect(process.env.MONGO_URL)
      const products = await Product.find({ name })
      res.json({
        products
      })
    }
    catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
}

const ProductByBrand = async (req, res) => {
    const { brand } = req.params;
    try {
      await connect(process.env.MONGO_URL)
      const products = await Product.find({ brand })
      res.json({
        products
      })
    }
    catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
}

const ProductByCategory = async (req, res) => {
    const { category } = req.params;
    try {
      await connect(process.env.MONGO_URL)
      const products = await Product.find({ category })
      res.json({
        products
      })
    }
    catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
}


const ProductById = async (req, res) => {
    const { _id } = req.params

    try {
        await connect(process.env.MONGO_URL)
        const products = await Product.findOne({ _id })
        res.json({
            products
        })
    }

    catch (error) {
        res.json({
          message: error.message
        })

    }
}


module.exports = { AddProduct, AllProducts, UpdateProduct, DeleteProduct,ProductByName,ProductByCategory,ProductById,ProductByBrand}



