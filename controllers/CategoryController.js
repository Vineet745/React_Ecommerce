import CategoryModel from "../models/CategoryModel.js"
import slugify from "slugify"

// Create
export const CreateCategoryController = async (req,res)=>{
  try {
     const {name} = req.body
     if(!name){
        return res.status(401).send({message:"Name is Required"})
     }
     const existingCategory = await CategoryModel.findOne({name})
     if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"Category Already Exists"
        })
     }

     const category = await new CategoryModel({name,slug:slugify(name)}).save()
     res.status(201).send({
        success:true,
        message:"new category Created",
        category
     })


  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in Category"
    })
  }
}


// update
export const updateCategoryController = async (req,res)=>{
    try {
        const {name} = req.body 
        const {id} = req.params
        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while Updating Category"
        })
    }
}

// get all cat

export const categoryController = async(req,res)=>{
    try {
        const category = await CategoryModel.find()
        res.status(200).send({
            success:true,
            message:"All categories List",
            category, 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:`Error while getting all categories`
        })
    }

}

// Single category get
export const SingleCategoryController = async(req,res)=>{
    try {
        const category = await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get single Category Success",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:`Error while getting all categories`
        })
        }
}

// Delete Category
export const DeleteCategory = async(req,res)=>{
    try {
        const {id} = req.params
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:`Error while deleting category`,
            error
        })
    }
}