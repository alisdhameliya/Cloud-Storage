const { getBlobFile } = require("../services/index");

const getDownloadedFiles = async (req, res, next) => {
    try {
        const fileId = (req.params.id).split(':')[1];
        const email = req.headers['email'];
        const { bufferResponse, contentType } = await getBlobFile(fileId, email);
        res.status(200).send({ bufferResponse, contentType});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getDownloadedFiles
};