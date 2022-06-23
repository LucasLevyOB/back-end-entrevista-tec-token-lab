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

    // console.log("///response///");
    // console.log(response);
    // console.log("///conflicts///");

    // const conflicts = response.filter((event) => {
    //   const createdEventIsSameBegin = moment(
    //     dateBegin + "T" + timeBegin
    //   ).isSame(event.eve_date_begin + "T" + event.eve_time_begin);
    //   const createdEventIsSameEnd = moment(dateEnd + "T" + timeEnd).isSame(
    //     event.eve_date_end + "T" + event.eve_time_end
    //   );
    //   const createdEventIsBetweenBegin = moment(
    //     dateBegin + "T" + timeBegin
    //   ).isBetween(
    //     event.eve_date_begin + "T" + event.eve_time_begin,
    //     event.eve_date_end + "T" + event.eve_time_end
    //   );
    //   const createdEventIsBetweenEnd = moment(
    //     dateEnd + "T" + timeEnd
    //   ).isBetween(
    //     event.eve_date_begin + "T" + event.eve_time_begin,
    //     event.eve_date_end + "T" + event.eve_time_end
    //   );
    //   const anotherEventIsBetweenCreatedEventBegin = moment(
    //     event.eve_date_begin + "T" + event.eve_time_begin
    //   ).isBetween(dateBegin + "T" + timeBegin, dateEnd + "T" + timeEnd);
    //   const anotherEventIsBetweenCreatedEventEnd = moment(
    //     event.eve_date_end + "T" + event.eve_time_end
    //   ).isBetween(dateBegin + "T" + timeBegin, dateEnd + "T" + timeEnd);

    //   return (
    //     createdEventIsSameBegin ||
    //     createdEventIsSameEnd ||
    //     createdEventIsBetweenBegin ||
    //     createdEventIsBetweenEnd ||
    //     anotherEventIsBetweenCreatedEventBegin ||
    //     anotherEventIsBetweenCreatedEventEnd
    //   );
    // });

    // console.log(conflicts);
    // console.log("///end///");

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
