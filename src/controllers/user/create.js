const connection = require("../../database/connection");

async function create(req, res, next) {
  try {
    const { name, email, password } = req.body;
    await connection("users").insert({
      usr_name: name,
      usr_email: email,
      usr_password: password,
    });

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
}

module.exports = create;
