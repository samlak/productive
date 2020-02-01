const moment = require('moment');
const {loadLog, timeToNumber} = require('./command_line');

const pushDate = (dateCollection, date, singleDate, level) => {
    dateCollection.push([
        moment(date).format("DD/MM"),
        ` ${moment.duration(singleDate).hours()} hour(s) ${moment.duration(singleDate).minutes()} minute(s) ${moment.duration(singleDate).seconds()} second(s)`,
        level
    ]);
}

const getDate = () => {
    const logs = loadLog();

    let dateCollection = [];

    const date = logs.map((log) => moment(log.start).format("YYYY-MM-DD"))
        .filter((value, index, self) => self.indexOf(value) === index);
    
    for(var i = 0; i < date.length; i++){
        const singleDate = logs.filter((noNull) => noNull.stop !== null)
            .map((log) =>  [moment(log.start).format("YYYY-MM-DD"), timeToNumber(log.stop) -  timeToNumber(log.start)])
            .filter((filtered) => filtered[0] === date[i])
            .map((filteredLog) => filteredLog[1])
            .reduce((start, stop) => start + stop);
        
        if(moment.duration(singleDate).hours() < 3){
            pushDate(dateCollection, date[i], singleDate, 1);
        } else if(moment.duration(singleDate).hours() >= 3 && moment.duration(singleDate).hours() < 5){
            pushDate(dateCollection, date[i], singleDate, 2);
        } else if (moment.duration(singleDate).hours() >= 5 && moment.duration(singleDate).hours() < 10){
            pushDate(dateCollection, date[i], singleDate, 3);
        } else if(moment.duration(singleDate).hours() >= 10){
            pushDate(dateCollection, date[i], singleDate, 4);
        }

    }
    // console.log(dateCollection);
    return dateCollection;
}

getDate();

const serveData = () => {
    const logs = loadLog();
    const daysInYear = moment().endOf("year").dayOfYear();
    const firstDayOfTheYear = moment().startOf('year').valueOf();
    const dateCollection = getDate();
    
    let date = [];
    let level = [];

    for(let i = 0; i < daysInYear; i++){
        const valueOfDay = 86400000 * i;
        const day = firstDayOfTheYear + valueOfDay; 
        const matchDate = dateCollection.find((days) => days[0] == moment(day).format('DD/MM'))
        if(matchDate){
            date.push([matchDate[0], matchDate[1]]);
            level.push(matchDate[2]);
        }else {
            date.push([moment(day).format('DD/MM'), ` No coding activity for the day.`]);
            level.push(0);
        }
    }
    // console.log(level)

    return {daysInYear, date, level};
};

serveData();



module.exports = {serveData};