const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(routes);

// not found
app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  next(error);
});

// catch all
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error });
});

app.listen(3001);
