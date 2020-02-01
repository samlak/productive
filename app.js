require('dotenv').config();
const _ = require('lodash');
const yargs = require('yargs');
const express = require('express');

const {start, stop, getLog} = require('./command_line');
const {serveData} = require('./frontend');

app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const durationDisplay = (timeSpent) => {
    if(typeof timeSpent.duration === 'object'){
        return `You have spent ${timeSpent.duration.month} month(s) ${timeSpent.duration.week} week(s) ${timeSpent.duration.day} day(s) ${timeSpent.duration.hour} hour(s) ${timeSpent.duration.minute} minute(s) ${timeSpent.duration.second} second(s) coding.`;
    }else if(typeof timeSpent.duration === 'string'){
        return timeSpent.duration;
    }
}

app.get("/", function(req, res){
    const data = serveData();
    res.render('home', {data});
});

app.post("/start", function(req, res){
    start();
});

app.post("/stop", function(req, res){
    stop();
});

app.get("/log/:status", function(req, res){
    const getTime = getLog(req.params.status);
    console.log(durationDisplay(getTime));
    return durationDisplay(getTime);
});

app.listen(3000, function() {
    console.log('Server running on port 3000.');
});

// yargs.command({
//     command: 'start',
//     describe: 'Starting productive',
//     handler(argv){
//         start();
//     }
// });

// yargs.command({
//     command: 'log',
//     describe: 'Checking productive status',
//     builder: {
//         status: {
//             describe: 'Status to check for',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler(argv){
//         const timeSpent = getLog(argv.status);
//         console.log(durationDisplay(timeSpent));
//     }
// });

// yargs.command({
//     command: 'stop',
//     describe: 'Stop productive',
//     handler(argv){
//         stop();
//     }
// });

// yargs.parse();