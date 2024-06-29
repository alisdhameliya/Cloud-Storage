const { File } = require("../model/index");
const { containerClient } = require("../utils/index")

const deleteFile = async (id, email) => {
    try {
        const fileDB = await File.findOne({ _id : id });
        if(!fileDB) {
            return { message: 'File not found', StatusCode: 404};
        }
        var blobDeleteResponse = '';
        try {
            const blobClient = containerClient.getBlockBlobClient(`${email}/${fileDB.name}`);
            blobDeleteResponse = await blobClient.delete();
        } catch (error) {
            return { message: "Error in Deleting file from Azure, Please try again. fileId: " + blobDeleteResponse.requestId, StatusCode: 500};
        }
        await File.deleteOne({ _id : id });
        return { message: 'File Deleted successfully', StatusCode: 200};
    } catch (error) {
        return { message: 'Error in Deleting file from Database, Please try again', StatusCode: 500};   
    }
};

module.exports = {
    deleteFile
};