const { deleteFile } = require("../services/index");

const deleteFileData = async (req, res, next) => {
    try {
        const fileId = (req.params.id).split(':')[1];
        const email = req.headers['email'];
        const { message, StatusCode } = await deleteFile(fileId, email);
        res.status(StatusCode).send({ message });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    deleteFileData
};