const { deleteFile } = require("./deleteFile");
const { getBlobFile } = require("./getBlobFile");
const { getFiles } = require("./getFiles");
const { uploadFile, findAvailableName } = require("./uploadFile");
module.exports = {
    deleteFile,
    getBlobFile,
    getFiles,
    uploadFile,
    findAvailableName
}