const _ = require('lodash');
const yargs = require('yargs');

const {start, stop, getLog} = require('./process');

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
        console.log(getLog(argv.status));
    }
});

yargs.command({
    command: 'stop',
    describe: 'Stop productive',
    handler(argv){
        stop(7);
    }
});

yargs.parse();
