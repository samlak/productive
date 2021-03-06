require('dotenv').config();
const fs = require('fs');
const moment = require('moment');

const start = () => {
    const logs = loadLog();

    // const started = logs.find((nulledLog) => nulledLog.stop === null);

    // if(started){
    //     stop(started.id);
    // }

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
    generateEnv(id);

    console.log('Prductive started ............');
};

const stop = () => {
    const id = Number(process.env.LAST_ID);
    const logs = loadLog();
    const log = logs.find((log) => log.id === id);
    if(log.stop === null){
        log.stop =  moment();
    }
    saveLog(logs);
    console.log('Prductive stopped');
    console.log('-----------------');
    getLog('today');

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
                if(moment(filteredLog.start).dayOfYear() === today && filteredLog.stop != null){
                    return filteredLog;
                }
            } else if (status === 'yesterday'){
                if(moment(filteredLog.start).dayOfYear() === yesterday  && filteredLog.stop != null){
                    return filteredLog;
                }
            } else if (status === 'thisWeek'){
                if(moment(filteredLog.start).week() === thisWeek && filteredLog.stop != null){
                    return filteredLog;
                }
            } else if (status === 'lastWeek'){
                if(moment(filteredLog.start).week() === lastWeek && filteredLog.stop != null){
                    return filteredLog;
                }
            } else if (status === 'thisMonth'){
                if(moment(filteredLog.start).month() === thisMonth && filteredLog.stop != null){
                    return filteredLog;
                }
            } else if (status === 'lastMonth'){
                if(moment(filteredLog.start).month() === lastMonth && filteredLog.stop != null){
                    return filteredLog;
                }
            } else if (status === 'all'){
                if(filteredLog.stop != null){
                    return filteredLog;
                }
            }
        }).map((duration) => timeToNumber(duration.stop) - timeToNumber(duration.start))
        .reduce((start, stop) => {
            return start + stop;
        }, 0);
        const timeSpent = {
            "duration": {
                month: moment.duration(log).months(),
                week: moment.duration(log).weeks(),
                day: moment.duration(log).days(),
                hour: moment.duration(log).hours(),
                minute: moment.duration(log).minutes(),
                second: moment.duration(log).seconds()
            }
        };
        return timeSpent;
    } else {
        return {
            "duration": "You have checked for the wrong status. You can only check for this ['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'all']"
        }
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

const generateEnv = (id) => {
    const env = `LAST_ID=${id}`;
    fs.writeFileSync('.env', env);
};

module.exports = {start, stop, getLog, loadLog, timeToNumber};