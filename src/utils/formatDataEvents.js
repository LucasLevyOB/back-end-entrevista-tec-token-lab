function formatDataEvents(events) {
  let formatedData = [];
  let lastDate = "";
  let obj = {
    date: "",
    events: [],
  };
  for (let i = 0; i < events.length; i++) {
    if (lastDate !== events[i].eve_date_begin) {
      obj = {
        date: events[i].eve_date_begin,
        events: [],
      };
      obj.events.push(events[i]);
      lastDate = events[i].eve_date_begin;
      formatedData.push(obj);
    } else {
      obj.events.push(events[i]);
    }
  }
  return formatedData;
}

module.exports = formatDataEvents;
