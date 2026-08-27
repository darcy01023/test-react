require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

mongoose.connect(process.env.MONGODB_URI);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
