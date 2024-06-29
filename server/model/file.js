const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: String, 
    fileType: String,
    caption: String,
    imageUrl: String,
    size: String,
    uploadDate: String,
    uploadTime: String,
    email: String
});

const File = mongoose.model("File", fileSchema);

module.exports = {
    File
};