const connection = require("../../database/connection");

async function create(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await connection("users")
      .select("*")
      .where("usr_email", email)
      .andWhere("usr_password", password);
    if (user.length !== 1) {
      return res.status(400).json({ error: "Email e/ou senha incorretos" });
    }
    return res.status(201).json(user[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = create;
