const connection = require("../../database/connection");

// const moment = require("moment");

const verifyConflicEvents = require("../../utils/verifyConflictEvents");

async function create(req, res, next) {
  try {
    const { userId } = req.params;
    const { title, description, fullDateBegin, fullDateEnd } = req.body;
    const createdAt = new Date();
    const [dateBegin, timeBegin] = fullDateBegin.split("T");
    const [dateEnd, timeEnd] = fullDateEnd.split("T");

    const response = await connection("events")
      .select("*")
      .whereBetween("eve_date_begin", [dateBegin, dateEnd])
      .whereBetween("eve_date_end", [dateBegin, dateEnd]);

    const conflicts = verifyConflicEvents(
      response,
      dateBegin,
      timeBegin,
      dateEnd,
      timeEnd
    );

    if (conflicts.length > 0) return res.status(409).json(conflicts);

    await connection("events").insert({
      usr_id: userId,
      eve_title: title,
      eve_description: description,
      eve_date_begin: dateBegin,
      eve_time_begin: timeBegin,
      eve_date_end: dateEnd,
      eve_time_end: timeEnd,
      eve_created_at: createdAt,
    });

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
}

module.exports = create;
