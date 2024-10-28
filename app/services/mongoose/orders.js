const Orders = require('../../api/v1/order/model');

const getAllOrders = async (req) => {
  const { limit = 1, page = 1, startDate, endDate } = req.query; //default limit 10 dan page 1
  let condition = {};
  let match = {}
  console.log(req.user.organizer)
  if (req.user.role !== 'owner') {
    // condition = { ...condition, 'historyEvent.organizer': req.user.organizer };
    match = { organizer: req.user.organizer }
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    condition = {
      ...condition,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }
 
  const result = await Orders.find(condition)
    .populate({ 
      path: 'event', match
    })
    .limit(limit)
    .skip(limit * (page - 1)); // skip dokumen terdahulu untuk paginasi

  // Filter manual berdasarkan apakah field event bukan null
  const filteredResult = result.filter(order => order.event != null);

  const count = await Orders.countDocuments(condition);

  return { data: filteredResult, pages: Math.ceil(count / limit), total: count };
};

module.exports = {
  getAllOrders,
};