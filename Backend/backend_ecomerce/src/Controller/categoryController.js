const categoryModel = require('../Model/categoryModel');


const createCategory = async (req, res) => {
   
        const data = req.body;
        const category = await categoryModel.createCategory(data);
        res.status(201).json(category);
    

}

const getCategory = async (req, res) => {

        const categories = await categoryModel.getCategory();
        res.status(200).json(categories);
 
};

const updateCategory = async (req, res) => {

        const  id  = req.params.id;
        const data = req.body;
        const category = await categoryModel.updateCategory(id, data);
        res.status(200).json(category);
  
};

const deleteCategory = async (req, res) => {

        const id  = req.params.id;
        const category = await categoryModel.deleteCategory(id);
        res.status(200).json(category);
  
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};