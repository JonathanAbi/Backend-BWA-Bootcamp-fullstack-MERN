const Categories = require('../../api/v1/categories/model')
const { BadRequestError, NotFoundError } = require('../../errors/index')
const mongoose = require('mongoose')

const getAllCategories = async (req) => {
    const result = await Categories.find({organizer: req.user.organizer})
    return result
}

const createCategory = async (req) => {
    const { name } = req.body

    //check duplicate
    const check = await Categories.findOne({ name, organizer: req.user.organizer })
    if(check) throw new BadRequestError('Duplicate name category')

    const result = await Categories.create({name, organizer: req.user.organizer}) // harus {name} tidak bisa name saja karena yang diterima berupa objek
    return result
}

const getOneCategory = async (req) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id) && id.length!=24) throw new BadRequestError('Category id not valid')

    const result = await Categories.findOne({_id: id, organizer: req.user.organizer})

    if(!result)  throw new NotFoundError(`Category id ${id} not found`)
    return result
}
 
const updateCategory = async (req) => {
    const {id} = req.params
    const {name} = req.body

    if (!mongoose.Types.ObjectId.isValid(id) && id.length!=24) throw new BadRequestError('Category id not valid')

    //check duplicate name
    const check = await Categories.findOne({
        name,
        organizer: req.user.organizer,
        _id: {$ne: id}, // kecuali id sendiri
    })

    if(check) throw new BadRequestError('Name category duplicate')

    const result = await Categories.findByIdAndUpdate(
        {_id: id}, 
        { name },
        { new: true, runValidators: true }
    )
    if(!result) throw new NotFoundError(`Category id ${id} not found`) 

    return result
}

const deleteCategory = async(req) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id) && id.length!=24) throw new BadRequestError('Category id not valid')

    const result = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer
    });

    if (!result) throw new NotFoundError(`Category id ${id} not found`);

    await Categories.findByIdAndDelete(id);

    return result
}

const checkingCategory = async (id) => {
    const result = await Categories.findOne({ _id: id})

    if(!result) throw new NotFoundError(`Category with id: ${id} not found`)
}

module.exports = {
    getAllCategories,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
    checkingCategory
}