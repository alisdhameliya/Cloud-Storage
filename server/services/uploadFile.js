const { File } = require("../model/index");

const findAvailableName = async (basename, filetype, email) => {
    const name = `${basename}.${filetype}`;
    const existingName = await File.findOne({ name, email });
    if(!existingName) {
        return name;
    }
    let i = 1;
    while(true) {
        const name = `${basename} (${i++}).${filetype}`;
        const existingName = await File.findOne({ name, email });
        if(!existingName) {
            return name;   
        }
    }
};

const uploadFile = async (data) => {
    try {
        const file = new File(data);
        await file.save();
        return { message: 'Files Uploaded Successfully', StatusCode: 200};
    } catch (error) {
        return { message: 'Error in uploading file at database. Please try again.', StatusCode: 500};
    }
};

module.exports = {
    uploadFile,
    findAvailableName
}