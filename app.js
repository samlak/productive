require('dotenv').config();
const _ = require('lodash');
const yargs = require('yargs');
const express = require('express');

const {start, stop, getLog} = require('./command_line');
const {serveData} = require('./frontend');

app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", function(req, res){
    const data = serveData();
    res.render('home', {data});
});


yargs.command({
    command: 'start',
    describe: 'Starting productive',
    handler(argv){
        start();
    }
});

yargs.command({
    command: 'log',
    describe: 'Checking productive status',
    builder: {
        status: {
            describe: 'Status to check for',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        getLog(argv.status);
    }
});

yargs.command({
    command: 'stop',
    describe: 'Stop productive',
    handler(argv){
        const id = Number(process.env.LAST_ID);
        stop(id);
    }
});

yargs.parse();

app.listen(3000, function() {
    console.log('Server running on port 3000.');
});