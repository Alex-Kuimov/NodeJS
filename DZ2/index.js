const runServer = require('./server');
const yargs = require('yargs/yargs');

const APP_ENV_PREF = process.env['APP_ENV_PREF'] || 'APP_ENV_PREF';

const PORT = 3000;

const argv = yargs()
    .option('time',{
        alias: 't',
        describe: 'time',
        required: true,
    })
    .option('interval',{
        alias: 'l',
        describe: 'interval',
        required: true,
    })
    .env(APP_ENV_PREF)
    .argv

    
runServer(argv.time, argv.interval, PORT);
