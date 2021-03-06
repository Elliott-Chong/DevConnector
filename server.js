const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

app.use(express.json({ extended: false }));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://devconnector-elliott.netlify.app"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Application-Type, application-type"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");
  next();
});

connectDB();

app.get("/", (req, res) => res.send('DevConnector API running'));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(process.env.PORT || PORT, ()=>console.log('DevConnector API running on http://localhost:5000'));
