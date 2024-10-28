const Image = require('../../api/v1/images/model')
const { NotFoundError } = require('../../errors')

const createImage = async (req) => {
    const result = await Image.create({
        url: req.file ? `uploads/avatar/${req.file.filename}` : 'uploads/avatar/default.png'
    })

    return result
}

const checkingImage = async (id) => {
    const result = await Image.findOne({ _id: id})
    
    if(!result) throw new NotFoundError(`Image with id: ${id} not found`)

    return result
}

module.exports = { createImage, checkingImage }