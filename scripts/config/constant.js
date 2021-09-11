const path = require('path');
const portFinder = require('portfinder-sync');

const BASE_PORT = 3000;

const PROJECT_PATH = path.resolve(__dirname, '../../');

const SERVER_HOST = '0.0.0.0';
const SREVER_PORT = portFinder.getPort(BASE_PORT);

module.exports = {
    PROJECT_PATH,
    SERVER_HOST,
    SREVER_PORT,
};
