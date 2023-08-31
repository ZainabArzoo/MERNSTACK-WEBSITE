const { connect } = require("mongoose");
require("dotenv").config();
const category = require('./model')

const AddCategory = async (req, res) => {
    const { Categoryname,Categoryimage } = req.body
    try {
        await connect(process.env.MONGO_URL)

        const CheckDuplicate = await category.exists({ Categoryname })

        if (CheckDuplicate) {
            res.json({
                message: "Category Already Exists"
            })

        } else {

            await category.create({ Categoryname,Categoryimage })
            const Categories = await category.find()

            res.json({
                message: "Category Added Successfully",
                Categories
            })
        }
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const AllCategories = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const Categories = await category.find()
        res.json({
            Categories
        })
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const CategoryByName = async (req, res) => {
    const { Categoryname } = req.params;
    try {
      await connect(process.env.MONGO_URL)
      const Categories = await category.find({ Categoryname })
      res.json({
        Categories
      })
    }
    catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
}

const CategoryById = async (req, res) => {

    const { _id } = req.params;
    try {
      await connect(process.env.MONGO_URL)
      const Categories = await category.find({ _id })
      res.json({
        Categories
      })
    }
    catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
}

const UpdateCategory = async (req, res) => {
    const { Categoryname,Categoryimage,_id } = req.body

    const filter = {_id}
    const target = {Categoryname,Categoryimage}

    try {
        await connect(process.env.MONGO_URL)
        const Categories = await category.findOneAndUpdate(filter,target)
        res.json({
            message: "Category Updated successfully"
        })
    } 
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

const DeleteCategory = async (req, res) => {
    const { Categoryname } = req.body

    try {
        await connect(process.env.MONGO_URL)
        const Categories = await category.deleteOne({ Categoryname })
        res.json({
            message: "Category Deleted Successfully"
        })
    } 
    catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}


module.exports = {AddCategory,AllCategories,CategoryById,CategoryByName,UpdateCategory,DeleteCategory}




