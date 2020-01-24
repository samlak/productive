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
    const thisMonth = moment().month();

    const log = logs.filter((filteredLog) => {
        if(moment(filteredLog.start).dayOfYear() === today){
            return [filteredLog];
        }
    }).map((duration) => timeToNumber(duration.stop) - timeToNumber(duration.start))
    .reduce((start, stop) => start + stop);
    
    // const start = moment(log.start);
    // const date = start.valueOf();


    console.log(log);
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