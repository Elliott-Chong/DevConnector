const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

app.use(express.json({ extended: false }));

connectDB();

app.get("/", (req, res) => res.json({ elle: "is running" }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
