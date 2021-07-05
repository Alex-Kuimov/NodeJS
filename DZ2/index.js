const runServer = require('./server');
const yargs = require('yargs/yargs');

const APP_ENV_PREF = process.env['APP_ENV_PREF'] || 'APP_ENV_PREF';

const PORT = 3001;

const argv = yargs()
    .option('delay',{
        alias: 'd',
        describe: 'delay',
        required: true,
    })
    .option('limit',{
        alias: 'l',
        describe: 'limit',
        required: true,
    })
    .env(APP_ENV_PREF)
    .argv

    
runServer(argv.delay, argv.limit, PORT);
