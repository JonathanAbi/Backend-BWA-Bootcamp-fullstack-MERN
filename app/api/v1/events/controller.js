const {
    getAllEvents,
    getOneEvent,
    updateEvent,
    createEvent,
    deleteEvent,
    changeStatusEvent,
  } = require('../../../services/mongoose/event');
  
  const { StatusCodes } = require('http-status-codes');
  
  const create = async (req, res, next) => {
    try {
      const result = await createEvent(req);
  
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const index = async (req, res, next) => {
    try {
      const result = await getAllEvents(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const find = async (req, res, next) => {
    try {
      const result = await getOneEvent(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const update = async (req, res, next) => {
    try {
      const result = await updateEvent(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const destroy = async (req, res, next) => {
    try {
      const result = await deleteEvent(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const changeStatus = async (req, res, next) => {
    try {
      const result = await changeStatusEvent(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    index,
    find,
    update,
    destroy,
    create,
    changeStatus
  };