const moment = require('moment');
const {loadLog} = require('./command_line');

const serveData = () => {
    loadLog();
    
    const currentYear = new Date().getFullYear();
    const daysInYear = moment(`${currentYear}-12-31`, "YYYY-MM-DD").dayOfYear();

    
    return {daysInYear};
};

module.exports = {serveData};