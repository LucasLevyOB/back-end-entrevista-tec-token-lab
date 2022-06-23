const connection = require("../../database/connection");

async function getByUserId(req, res, next) {
  try {
    const { userId, date } = req.params;
    const events = await connection("events")
      .select("*")
      .where("usr_id", userId)
      .andWhere("eve_date_begin", date)
      .orderBy("eve_date_begin");

    return res.json(events);
  } catch (error) {
    next(error);
  }
}

module.exports = getByUserId;
