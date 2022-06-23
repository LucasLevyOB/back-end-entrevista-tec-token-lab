const connection = require("../../database/connection");

async function get(req, res, next) {
  try {
    const users = await connection("users").select("*");

    return res.json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = get;
