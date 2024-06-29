const getTime = (date_time_string) => {
    const date_time = new Date(date_time_string);
    const hours = ('0' + date_time.getHours()).slice(-2);
    const minutes = ('0' + date_time.getMinutes()).slice(-2);
    const seconds = ('0' + date_time.getSeconds()).slice(-2);
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
};

module.exports = {
    getTime
};