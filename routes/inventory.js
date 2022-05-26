const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const validate = require("../helpers/FormValidation");
const readWrite = require("../helpers/ReadWrite");

//Get details of all inventory items
router.get("/", (req, res) => {
  const inventoryItems = readWrite.readInventoryData();
  res.status(200).json(inventoryItems);
});

//Get details about a single inventory item
router.get("/:inventoryId", (req, res) => {
  const inventoryItems = readWrite.readInventoryData();
  const singleInventoryItem = inventoryItems.find(
    (item) => item.id === req.params.inventoryId
  );

  if (!singleInventoryItem) {
    return res.status(404).send("Inventory item not found");
  }
  res.json(singleInventoryItem);
});

//Update details of a single inventory item
router.patch("/:id", (req, res) => {
  if (validate.validateItem(req, res)) {
    const updatedInfo = req.body;
    const {
      id,
      warehouseID,
      warehouseName,
      itemName,
      description,
      category,
      status,
      quantity,
    } = updatedInfo;
    const inventory = readWrite.readInventoryData();
    const inventoryIndex = inventory.findIndex(
      (item) => item.id === req.params.id
    );
    const updatedItem = {
      id,
      warehouseID,
      warehouseName,
      itemName,
      description,
      category,
      status,
      quantity,
    };
    inventory.splice(inventoryIndex, 1, updatedItem);
    readWrite.writeInventoryData(inventory);
    res.status(201).send(updatedItem);
  }
});

//Create new inventory item
router.post("/", (req, res) => {
  const inventoryItems = readWrite.readInventoryData();

  const warehouses = readWrite.readWarehouseData()

  const { itemName, description, category, status, quantity, warehouseName } =
    req.body;

  if (
    !itemName ||
    !description ||
    !category ||
    !quantity ||
    !status ||
    !warehouseName
  ) {
    return res.status(400).json({
      msg: "Missing information required",
    });
  }

  currentWarehouse = warehouses.find(warehouse => warehouse.name === warehouseName)

  if (!currentWarehouse) {
    return res.status(404).json({
      msg: "Warehouse not found",
    });
  }

  const newInventoryItem = {
    id: uuidv4(),
    warehouseID : currentWarehouse.id,
    warehouseName,
    itemName,
    description,
    category,
    status,
    quantity 
  };

  inventoryItems.push(newInventoryItem);

  readWrite.writeInventoryData(inventoryItems);

  res.status(201).json(newInventoryItem);
});

//delete an inventory item
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const inventoryData = readWrite.readInventoryData();

  const foundInventory = inventoryData.find((item) => item.id === id);

  if (foundInventory !== undefined) {
    updatedInventoryData = inventoryData.filter((item) => item.id !== id);
    readWrite.writeInventoryData(updatedInventoryData);
    res.status(200).send(`Item ${id} deleted`);
  } else {
    res.status(404).send("item not found");
  }
});

module.exports = router;
