const fs = require('fs');
const moment = require('moment');

const start = () => {
    const logs = loadLog();
    if (logs.length == 0){
        var id = 1;
    } else {
        var id = logs[logs.length - 1]['id'];
        id += 1;
    }
    
    logs.push({
        id: id,
        start: moment(),
        stop: null
    });

    saveLog(logs);
    process.env.LAST_ID = id;
};

const stop = (id) => {
    const logs = loadLog();
    const log = logs.find((log) => log.id === id);

    log.stop =  moment();
    saveLog(logs)
    console.log(log.stop);
};

const getLog = (status) => {
    const logs = loadLog();
    const today = moment().dayOfYear();
    const yesterday = moment().dayOfYear() - 1;
    const thisWeek = moment().week();
    const lastWeek = moment().week() - 1;
    const thisMonth = moment().month();
    const lastMonth = moment().month() - 1; 
    
    if(status === 'today' || status === 'yesterday' || status === 'thisWeek' || status === 'lastWeek' || status === 'thisMonth' ||  status === 'lastMonth' || status === 'all') {
        const log = logs.filter((filteredLog) => {
            if(status === 'today'){
                if(moment(filteredLog.start).dayOfYear() === today){
                    return [filteredLog];
                }
            } else if (status === 'yesterday'){
                if(moment(filteredLog.start).dayOfYear() === yesterday){
                    return [filteredLog];
                }
            } else if (status === 'thisWeek'){
                if(moment(filteredLog.start).week() === thisWeek){
                    return [filteredLog];
                }
            } else if (status === 'lastWeek'){
                if(moment(filteredLog.start).week() === lastWeek){
                    return [filteredLog];
                }
            } else if (status === 'thisMonth'){
                if(moment(filteredLog.start).month() === thisMonth){
                    return [filteredLog];
                }
            } else if (status === 'lastMonth'){
                if(moment(filteredLog.start).month() === lastMonth){
                    return [filteredLog];
                }
            } else if (status === 'all'){
                return [filteredLog];
            }
        }).map((duration) => timeToNumber(duration.stop) - timeToNumber(duration.start))
        .reduce((start, stop) => {
            return start + stop;
        }, 0);

        return `You have spent ${moment.duration(log).months()} month(s) ${moment.duration(log).weeks()} week(s) ${moment.duration(log).days()} day(s)
        ${moment.duration(log).hours()} hour(s) ${moment.duration(log).minutes()} minute(s) ${moment.duration(log).seconds()} second(s) coding.`;
    } else {
        return "You have checked for the wrong status. You can only check for this ['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'all']";
    }

}

const timeToNumber = (time) => {
    let converttedTime = moment(time);
    return converttedTime.valueOf();
}

const loadLog = () => {
    try{
        const logs = fs.readFileSync('log.json').toString();
        return JSON.parse(logs);
    } catch(e){
        return [];
    }
};

const saveLog = (logs) => {
    fs.writeFileSync('log.json', JSON.stringify(logs));
}

module.exports = {start, stop, getLog};