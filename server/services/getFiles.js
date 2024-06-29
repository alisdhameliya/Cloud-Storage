const { File } = require("../model/index");

const getFiles = async (email) => {
    try {
        const getAll = await File.find({ email });
        return { data: getAll, StatusCode: 200 };
    } catch (error) {
        return { message: 'Error in fetching files from database. Please try again.', StatusCode: 500 };
    }
};

module.exports = {
    getFiles
};