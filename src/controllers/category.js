const {Category} = require("../models")

const createCategory = async(req, res) => {
    const {name} = req.body;
    try {

        // add existing category logic

        
        const category = await Category.create({name});
        res.status(201).json(category)
    } catch (error) {
        console.log("🚀 ~ createCategory ~ error:", error);
        res.status(500).json({message:"Internal server error"});
        
    }
 
}

const getCategory =async (req,res) => {
    try {
        const Categories = await Category.find();

        if(!Categories || Categories.length === 0)
        {
            return res.status(404).json({message:"Not found"})
        }

        res.status(200).json(Categories)
    } catch (error) {
        console.log("🚀 ~ getCategory ~ error:", error)
         res.status(500).json({message:"Internal server error"});
    }

}

const updateCategory = async (req,res) => {
    const categoryId = req.params.id;
     const {name} = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            categoryId,
            {name},
             { new: true }
        )

          if(!category)
        {
            return res.status(404).json({message:"Not found"})
        }
        res.status(200).json(category)
    } catch (error) {
       console.log("🚀 ~ updateCategory ~ error:", error)
       
         res.status(500).json({message:"Internal server error"});
        
    }
}
const deleteCategory = async (req,res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findByIdAndDelete(categoryId)
        res.status(200).json(category)
    } catch (error) {
        console.log("🚀 ~ deleteCategory ~ error:", error)
         res.status(500).json({message:"Internal server error"});
        
    }
}

module.exports.categoryController = {createCategory,getCategory,updateCategory,deleteCategory }