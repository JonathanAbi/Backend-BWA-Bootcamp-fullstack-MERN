const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, 'Ticket type must be filled'],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, 'Please provide firstName'],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, 'Please provide lastName'],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, 'Please provide email'],
      },
      role: {
        type: String,
        default: 'Designer',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: 'Participant',
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    historyEvent: {
      title: {
        type: String,
        required: [true, 'Title must be filled'],
        minlength: 3,
        maxlength: 50,
      },
      date: {
        type: Date,
        required: [true, 'Date and time must be filled'],
      },
      about: {
        type: String,
      },
      tagline: {
        type: String,
        required: [true, 'Tagline must be filled'],
      },
      keyPoint: {
        type: [String],
      },
      venueName: {
        type: String,
        required: [true, 'Venue must be filled'],
      },
      image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
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
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);