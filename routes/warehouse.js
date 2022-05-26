const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const validate = require("../helpers/FormValidation");
const readWrite = require("../helpers/ReadWrite");

//Get details of all warehouses
router.get("/", (req, res) => {
  const warehouses = readWrite.readWarehouseData();
  res.status(200).json(warehouses);
});

//Get details of a single warehouse
router.get("/:id", (req, res) => {
  const inventoryData = readWrite.readInventoryData();
  const id = req.params.id;
  const warehouse = readWrite.searchWarehouse(id);

  const warehouseInventory = inventoryData.filter(
    (value) => value.warehouseID === id
  );

  let obj = {
    warehouse: warehouse,
    inventory: warehouseInventory,
  };

  warehouse
    ? res.json(obj)
    : res.status(404).json({
        error: "Warehouse not found",
      });
});

//Create a new warehouse
router.post("/", (req, res) => {
  const warehouses = readWrite.readWarehouseData();

  const { name, address, city, country } = req.body;
  const { position, phone, email } = req.body.contact;

  const warehouseObj = {
    id: uuidv4(),
    name,
    address,
    city,
    country,
    contact: {
      name: req.body.contact.name,
      position,
      phone,
      email,
    },
  };

  if (validate.validateForm(req, res)) {
    warehouses.push(warehouseObj);
    readWrite.editWarehouseJSON(warehouses);
    return res.status(201).json(warehouseObj);
  }
});

//Update an existing warehouse
router.patch("/:id", (req, res) => {
  if (validate.validateForm(req, res)) {
    const updatedInfo = req.body;
    const { id, name, address, city, country, contact } = updatedInfo;
    const warehouses = readWrite.readWarehouseData();
    const warehouseIndex = warehouses.findIndex(
      (warehouse) => warehouse.id === req.params.id
    );
    const updatedWarehouse = {
      id,
      name,
      address,
      city,
      country,
      contact,
    };
    warehouses.splice(warehouseIndex, 1, updatedWarehouse);
    readWrite.editWarehouseJSON(warehouses);
    res.status(201).send(updatedWarehouse);
  }
});

//Delete an existing warehouse
router.delete("/:id", (req, res) => {
  const warehouseData = readWrite.readWarehouseData();
  const inventoryData = readInventoryData();
  const id = req.params.id;
  const warehouse = readWrite.searchWarehouse(id);

  if (!warehouse) {
    return res.status(404).json({
      error: "Warehouse Not Found",
    });
  }

  filteredInventory = inventoryData.filter((item) => item.warehouseID !== id);
  const index = warehouseData.findIndex((value) => value.id === id);

  warehouseData.splice(index, 1);

  readWrite.writeInventoryData(filteredInventory);
  readWrite.editWarehouseJSON(warehouseData);

  res.status(200).json({
    deleted_warehouse: warehouse,
  });
});

module.exports = router;
