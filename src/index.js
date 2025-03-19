require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const sertifikatRoute = require("./routes/sertifikat.routes");
const path = require("path");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use("/api-user", userRoute);
app.use("/api-auth", authRoute);
app.use("/api-sertifikat", sertifikatRoute);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
