const User = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizers/model')
const { BadRequestError } = require('../../errors')

const createOrganizer = async (req) => {
    const {organizer, email, password, confirmPassword, name, role} = req.body
    
    if(password !== confirmPassword) throw new BadRequestError('Password doesnt match')

    const result = await Organizer.create({ organizer })

    const user = await User.create({
        email,
        name,
        password,
        organizer : result._id,
        role,
    })

    delete user._doc.password //didelete biar gk tampil diresponsenya

    return user
}

const createUser = async (req) => {
    const { name, password, role, confirmPassword, email } = req.body
    
    if(password !== confirmPassword) throw new BadRequestError('Password doesnt match')

    const result = await User.create({
        name,
        email,
        organizer: req.user.organizer,
        password,
        role
    })

    return result
}

const getAllUser = async () => {
    const result = await User.find()

    return result
}

module.exports = { createOrganizer, createUser, getAllUser }