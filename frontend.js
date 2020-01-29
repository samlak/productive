const moment = require('moment');
const {loadLog} = require('./command_line');

const serveData = () => {
    const logs = loadLog();
    const daysInYear = moment().endOf("year").dayOfYear();
    const firstDayOfTheYear = moment().startOf('year').valueOf();
    
    let date = [];

    for(let i = 0; i < daysInYear; i++){
        const valueOfDay = 86400000 * i;
        const day = firstDayOfTheYear + valueOfDay;
        date.push(moment(day).format());
    }

    return {daysInYear, date};
};



module.exports = {serveData};