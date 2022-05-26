const express = require("express");
const app = express();
const cors = require("cors");
const SERVER_PORT = 8080;
const warehouseRoutes = require("./routes/warehouse");
const inventoryRoutes = require("./routes/inventory");

app.use(cors());
app.use(express.json());
app.use("/warehouse", warehouseRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening at port: ${SERVER_PORT}`);
});
