const { getFiles } = require("../services/index");

const getAllFiles = async (req, res, next) => {
    try {
        const email = req.headers['email'];
        const result = await getFiles(email);
        
        if(result.StatusCode == 200) {
            return res.status(200).send(result.data);
        } 
        else {
            return res.status(500).send(result.message);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllFiles
};