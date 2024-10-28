const { StatusCodes } = require('http-status-codes')
const { getAllCategories, createCategory, getOneCategory, updateCategory, deleteCategory } = require('../../../services/mongoose/categories')
const mongoose = require('mongoose');

const create = async (req, res, next) => {
    try {
        const result = await createCategory(req)
        res.status(StatusCodes.CREATED).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result =  await getAllCategories(req)
        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const findOne = async(req, res, next) => {
    try {
        const result = await getOneCategory(req)

        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        // const checkCategory = await Categories.findById(id)
        // if(!checkCategory) {
        //     return res.status(404).json({
        //         message: 'Id tidak ditemukan',
        //     })
        // }
        // checkCategory.name = req.body.name
        // checkCategory.save()

        // atas cara tradisional, bawah pake APInya

        const result = await updateCategory(req)

        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {   
        const result = await deleteCategory(req)

        res.status(StatusCodes.OK).json({
            data: result,
            msg: 'Data has been deleted'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    findOne,
    update,
    destroy,
}