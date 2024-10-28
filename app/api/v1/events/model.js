const mongoose = require('mongoose')

const ticketCategoriesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Ticket type must be filled']
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0
    },
    statusTicketCategories: {
        type: Boolean,
        enum: [true, false],
        default: true,
    },
    expired: {
        type: Date,
    }
})

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be filled'],
        minLength: [3, 'Name length min 3 characters'],
        maxLength: [50, 'Name length max 50 characters'],
    },
    date: {
        type: Date,
        required: [true, 'Date and time must be filled']
    },
    about: {
        type: String,
    },
    tagline: {
        type: String,
        required: [true, 'Tagline must be filled']
    },
    keyPoint: {
        type: [String],
    },
    venueName: {
        type: String,
        required: [true, 'Venue name must be filled']
    },
    statusEvent: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft',
    },
    tickets: {
        type: [ticketCategoriesSchema], //array karena 1 event bisa punya banyak ticket
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    talent: {
        type: mongoose.Types.ObjectId,
        ref: 'Talent',
        required: true,
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true
    }
}, { timestamps: true } )

module.exports = mongoose.model('Event', eventSchema)