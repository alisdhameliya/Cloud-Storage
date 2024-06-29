const getDate = (date_time_string) => {
    const date_time = new Date(date_time_string);
    const year = date_time.getFullYear();
    const month = ('0' + (date_time.getMonth() + 1)).slice(-2); 
    const day = ('0' + date_time.getDate()).slice(-2);
    const date = `${year}-${month}-${day}`;
    return date;
};

module.exports = { 
    getDate
};