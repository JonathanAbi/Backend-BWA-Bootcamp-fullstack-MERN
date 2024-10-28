const mongoose = require('mongoose')
const { model, Schema } = mongoose
const bcrypt = require('bcryptjs')

let userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name must be filled'],
            minLength: [3, 'Name length min 3 characters'], // argumen kedua untuk pesan error
            maxLength: [20, 'Name length max 20 characters'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email must be filled']
        },
        password: {
            type: String,
            required: [true, 'Password must be filled'],
            minlength: [6, 'Password must be more than 6 characters']
        },
        role: {
            type: String,
            enum: ['admin', 'organizer', 'owner'],
            default: 'admin'
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        }
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    const User = this
    if(User.isModified('password')){
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = model('User', userSchema)