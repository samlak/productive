const _ = require('lodash');
const yargs = require('yargs');
const express = require('express');

app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const {start, stop, getLog} = require('./process');

app.get("/", function(req, res){
    res.render('home', {data: 'data'});
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
        stop(process.env.LAST_ID);
    }
});

yargs.parse();

app.listen(3200, function() {
    console.log('Server running on port 3200.');
});