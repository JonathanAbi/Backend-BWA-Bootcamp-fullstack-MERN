const mongoose = require('mongoose')
const { model, Schema } = mongoose

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name must be filled']
        },
        role: {
            type: String,
            default: '-'
        },
        //untuk membuat relasi pada mongodb harus membuat type ObjectId
        image: {
            type: mongoose.Types.ObjectId, 
            ref: 'Image', // berelasi dengan dokumen Image
            required: [true, 'Image required'],
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = model('Talent', talentSchema)