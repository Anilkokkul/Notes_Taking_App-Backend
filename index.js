const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const { db } = require("./DB/connect");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://master--lambent-hotteok-bde6bb.netlify.app",
    "https://lambent-hotteok-bde6bb.netlify.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(userRoutes);
app.use(notesRoutes);
const port = process.env.PORT || 3000;
db();

app.get("/", (req, res) => {
  res.send("<h1>This is the Notes Taking app created by Anil Kokkul</h1>");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
