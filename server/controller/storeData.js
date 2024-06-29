const dotenv = require("dotenv/config");
const { uploadFile, findAvailableName } = require("../services/index");
const { containerClient, getTime, getDate } = require("../utils/index");

const getSize = (size) => {
    if(size < 1024) return size + " B";
    if(size < 1048576) return (size / 1024).toFixed(2) + " KB";
    return (size / 1048576).toFixed(2) + " MB";
};

const extractMetadata = async (headers) => {
    const contentType = headers['content-type'];
    const fileType = contentType.split('/')[1];
    const size = getSize(headers['content-length']);
    const contentDisposition = headers['content-disposition'] || '';
    const caption = headers['image-caption'] || 'No caption provided';
    const matches = /filename="([^"]+)"/i.exec(contentDisposition);
    const fileName = matches?.[1] || `image-${Date.now()}.${fileType}`;
    const email = headers['email'];
    return { fileName, caption, fileType, size, email };
};

const generateURL = async (blobFileName, dataStream, email) => {
    const blobClient = containerClient.getBlockBlobClient(`${email}/${blobFileName}`);
    await blobClient.uploadStream(dataStream);
    return blobClient.url;
};

const storeMetadata = async (req, res, next) => {
    try {
        const { fileName, caption, fileType, size, email } = await extractMetadata(req.headers);
        if(size.split(' ')[0] > 10 && size.split(' ')[1] == "MB") {
            return res.status(413).send({ message: 'File size is too large. Please upload a smaller file upto 10 MB.' });
        }
        const basename = fileName.split('.')[0];
        const name = await findAvailableName(basename, fileType, email);
        const imageUrl = await generateURL(name, req, email);
        const uploadTime = getTime(Date.now());
        const uploadDate = getDate(Date.now());
        const data = {name, caption, fileType, imageUrl, size, uploadTime, uploadDate, email};
        const {message, StatusCode} = await uploadFile(data);
        return res.status(StatusCode).send({ message });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    storeMetadata
};