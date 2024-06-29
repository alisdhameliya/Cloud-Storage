const { getTime } = require("./getTime");
const { getDate } = require("./getDate");
const { containerClient } = require("./azure");

module.exports = {
    getTime,
    getDate,
    containerClient
}