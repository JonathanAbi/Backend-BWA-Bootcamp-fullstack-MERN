const mongoose = require('mongoose')
const { model, Schema } = mongoose

let categorySchema = Schema(
    {
        name: {
            type: String,
            minLength: [3, 'Name length min 3 characters'], // argumen kedua untuk pesan error
            maxLength: [20, 'Name length max 20 characters'],
            required: [true, 'Nama kategori harus diisi'],
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = model('Category', categorySchema)