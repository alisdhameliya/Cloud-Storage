const express = require("express");
const { storeMetadata, getAllFiles, deleteFileData, getDownloadedFiles } = require("../controller/index");

const router = express.Router();

// GET Request
router.get("/allFiles", getAllFiles);
router.get("/file/download/:id", getDownloadedFiles);

// POST Request
router.post("/file/upload", storeMetadata);

// DELETE Request
router.delete("/file/delete/:id", deleteFileData);

module.exports = router;