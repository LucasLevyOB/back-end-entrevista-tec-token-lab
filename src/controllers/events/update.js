const connection = require("../../database/connection");

const verifyConflicEvents = require("../../utils/verifyConflictEvents");

async function update(req, res, next) {
  try {
    const { eventId } = req.params;
    const { title, description, fullDateBegin, fullDateEnd } = req.body;
    const [dateBegin, timeBegin] = fullDateBegin.split("T");
    const [dateEnd, timeEnd] = fullDateEnd.split("T");

    const response = await connection("events")
      .select("*")
      .whereBetween("eve_date_begin", [dateBegin, dateEnd])
      .whereBetween("eve_date_end", [dateBegin, dateEnd])
      .andWhereNot("eve_id", eventId);

    const conflicts = verifyConflicEvents(
      response,
      dateBegin,
      timeBegin,
      dateEnd,
      timeEnd
    );

    if (conflicts.length > 0) return res.status(409).json(conflicts);

    await connection("events")
      .update({
        eve_title: title,
        eve_description: description,
        eve_date_begin: dateBegin,
        eve_time_begin: timeBegin,
        eve_date_end: dateEnd,
        eve_time_end: timeEnd,
      })
      .where("eve_id", eventId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = update;
