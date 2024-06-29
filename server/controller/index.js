const { deleteFileData } = require("./deleteData");
const { getDownloadedFiles } = require("./getDownloadData");
const { getAllFiles } = require("./getData");
const { storeMetadata } = require("./storeData");

module.exports = {
    deleteFileData, 
    getDownloadedFiles,
    getAllFiles,
    storeMetadata
}