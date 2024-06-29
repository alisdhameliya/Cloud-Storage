const { File } = require("../model/index");
const { containerClient } = require("../utils/index");

const streamToBuffer = async (readableStream) => {
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
};

const getBlobFile = async (id, email) => {
    const fileDB = await File.findOne({ _id : id});
    const blobClient = containerClient.getBlockBlobClient(`${email}/${fileDB.name}`);
    const blobExist = await blobClient.exists();
    if(!blobExist) {  
        return { message: "Sorry, file not found", StatusCode: 404 };
    }
    const downloadedResponse = await blobClient.download(0); // download(0) + streamToBuffer => used for larger files.
    const contentType = downloadedResponse.originalResponse.contentType;
    const bufferResponse = await streamToBuffer(downloadedResponse.readableStreamBody);
    // const bufferResponse = (await blobClient.downloadToBuffer()).buffer; // does the buffering in built and used for smaller files.
    return {bufferResponse, contentType};  
}
module.exports = {
    getBlobFile
};