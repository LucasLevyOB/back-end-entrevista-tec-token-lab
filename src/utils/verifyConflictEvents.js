const moment = require("moment");

function verifyConflicEvents(events, dateBegin, timeBegin, dateEnd, timeEnd) {
  const conflicts = events.filter((event) => {
    const createdEventIsSameBegin = moment(dateBegin + "T" + timeBegin).isSame(
      event.eve_date_begin + "T" + event.eve_time_begin
    );
    const createdEventIsSameEnd = moment(dateEnd + "T" + timeEnd).isSame(
      event.eve_date_end + "T" + event.eve_time_end
    );
    const createdEventIsBetweenBegin = moment(
      dateBegin + "T" + timeBegin
    ).isBetween(
      event.eve_date_begin + "T" + event.eve_time_begin,
      event.eve_date_end + "T" + event.eve_time_end
    );
    const createdEventIsBetweenEnd = moment(dateEnd + "T" + timeEnd).isBetween(
      event.eve_date_begin + "T" + event.eve_time_begin,
      event.eve_date_end + "T" + event.eve_time_end
    );
    const anotherEventIsBetweenCreatedEventBegin = moment(
      event.eve_date_begin + "T" + event.eve_time_begin
    ).isBetween(dateBegin + "T" + timeBegin, dateEnd + "T" + timeEnd);
    const anotherEventIsBetweenCreatedEventEnd = moment(
      event.eve_date_end + "T" + event.eve_time_end
    ).isBetween(dateBegin + "T" + timeBegin, dateEnd + "T" + timeEnd);

    return (
      createdEventIsSameBegin ||
      createdEventIsSameEnd ||
      createdEventIsBetweenBegin ||
      createdEventIsBetweenEnd ||
      anotherEventIsBetweenCreatedEventBegin ||
      anotherEventIsBetweenCreatedEventEnd
    );
  });

  return conflicts;
}

module.exports = verifyConflicEvents;
