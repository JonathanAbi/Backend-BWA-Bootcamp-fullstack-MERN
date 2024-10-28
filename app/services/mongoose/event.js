const Events = require('../../api/v1/events/model')
const { checkingImage } = require('./image')
const { checkingCategory } = require('./categories')
const { checkingTalent } = require('./talents')
const {NotFoundError, BadRequestError } = require('../../errors/index')

const getAllEvents = async (req) => {
    const { keyword, category, talent, status} = req.query
    let condition = {organizer: req.user.organizer}

    if(keyword){
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } }
    }

    if(category){
        condition = { ...condition, category: category }
    }

    if(talent){
        condition = { ...condition, talent: talent }
    }

    if(['Draft', 'Published'].includes(status)){
        condition = {...condition, statusEvent: status}
    }

    const result = await Events.find(condition)
        .populate({ 
            path: 'image', select: '_id url' 
        })
        .populate({ 
            path: 'category',
            select: '_id name'
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { 
                path: 'image', select: '_id url'
            }
        })

    return result
}

const createEvent = async (req) => {
    const{
        title,
        date,
        about,
        tagline,
        keyPoint,
        statusEvent,
        venueName,
        tickets,
        image,
        category,
        talent,
    } = req.body

    await checkingImage(image)
    await checkingCategory(category)
    await checkingTalent(talent)
    const check = await Events.findOne({ title })

    if(check) throw new BadRequestError('Event title has been registered')
    
    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
        organizer: req.user.organizer
    })
    
    return result
}

const getOneEvent = async (req) => {
    const {id} = req.params

    const result = await Events.findOne({ _id: id, organizer: req.user.organizer })
        .populate({ 
            path: 'image', 
            select: '_id url' 
        })
        .populate({ 
            path: 'category',
            select: '_id name'
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { 
                path: 'image', select: '_id url'
            }
        })

    if(!result) throw new NotFoundError(`Event with id: ${id} not found`)
    return result
}

const updateEvent = async (req) => {
    const {id} = req.params
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body

    await checkingImage(image)
    await checkingCategory(category)
    await checkingTalent(talent)

    const checkEvent = await Events.findOne({ _id: id })

    if(!checkEvent) throw new NotFoundError(`Event with id: ${id} not found`)

    const check = await Events.findOne({
        title,
        organizer: req.user.organizer,
        _id: { $ne: id },
    })

    if(check) throw new BadRequestError('Event title has been registered')

    const result = await Events.findOneAndUpdate(
        { _id: id },
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
            organizer: req.user.organizer
        },
        { new: true, runValidators: true }
    )
    
    return result
}

const deleteEvent = async (req) => {
    const {id} = req.params

    const result = await Events.findOne({
        _id: id,
        organizer: req.user.organizer
    });

    if (!result) throw new NotFoundError(`Event id ${id} not found`);

    await Events.findByIdAndDelete(id);

    return result
}

const changeStatusEvent = async (req) => {
    const { id } = req.params;
    const { statusEvent } = req.body;
  
    if (!['Draft', 'Published'].includes(statusEvent)) {
      throw new BadRequestError('Status must be Draft or Published');
    }
  
    // cari event berdasarkan field id
    const checkEvent = await Events.findOne({
      _id: id,
      organizer: req.user.organizer,
    });
  
    if (!checkEvent)
      throw new NotFoundError(`There are no event with id :  ${id}`);
  
    checkEvent.statusEvent = statusEvent;
  
    await checkEvent.save();
  
    return checkEvent;
  };

module.exports = {
    getAllEvents,
    createEvent,
    getOneEvent,
    updateEvent,
    deleteEvent,
    changeStatusEvent,
}