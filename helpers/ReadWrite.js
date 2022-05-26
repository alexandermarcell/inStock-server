const fs = require("fs");

const readInventoryData = () => {
  const data = fs.readFileSync("./data/inventories.json");
  const parsedData = JSON.parse(data);

  return parsedData;
};

const writeInventoryData = (data) => {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/inventories.json", stringifiedData);
};

const readWarehouseData = () => {
  const data = fs.readFileSync("./data/warehouses.json");
  const parsedData = JSON.parse(data);

  return parsedData;
};

const editWarehouseJSON = (data) => {
  const stringData = JSON.stringify(data);
  fs.writeFileSync("./data/warehouses.json", stringData);
};

const searchWarehouse = (id) => {
  const warehouseData = readWarehouseData();
  const warehouse = warehouseData.find((value) => value.id === id);
  return warehouse;
};

exports.readInventoryData = readInventoryData;
exports.writeInventoryData = writeInventoryData;
exports.readWarehouseData = readWarehouseData;
exports.editWarehouseJSON = editWarehouseJSON;
exports.searchWarehouse = searchWarehouse;
