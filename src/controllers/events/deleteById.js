const connection = require("../../database/connection");

async function deleteById(req, res, next) {
  try {
    const { eventId } = req.params;

    await connection("events").where("eve_id", eventId).delete();

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteById;
