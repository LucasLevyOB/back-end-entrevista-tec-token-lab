const connection = require("../../database/connection");

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: { has: true, counter: 1 },
    };
  }, initialValue);
};

async function getDaysHaveEvents(req, res, next) {
  try {
    const { userId } = req.params;
    const daysHaveEvents = await connection("events")
      .select("eve_date_begin")
      .where("usr_id", userId)
      .groupBy("eve_date_begin");

    const formatedData = convertArrayToObject(daysHaveEvents, "eve_date_begin");

    return res.json(formatedData);
  } catch (error) {
    next(error);
  }
}

module.exports = getDaysHaveEvents;
