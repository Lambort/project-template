const path = require('path');

const net = require('net');

const portUsed = (port) => {
    const server = net.createServer().listen(port);
    let isOccupied;
    server.on('listening', () => {
        server.close();
        isOccupied = false;
    });
    server.on('error', (err) => {
        if (err.code == 'EADDRINUSE') {
            isOccupied = true;
        }
    });
    return isOccupied ? new Error('port occupied') : port;
};

const tryUsePort = (port) => {
    const PORT_LIMIT = Math.pow(256, 2);
    let availablePort;
    for (let i = port; i < PORT_LIMIT; i++) {
        let response = portUsed(port);
        if (response instanceof Error) {
            continue;
        } else {
            availablePort = i;
            break;
        }
    }
    return port;
};

const PROJECT_PATH = path.resolve(__dirname, '../../');

const SERVER_HOST = '0.0.0.0';
const SREVER_PORT = tryUsePort(3000);

module.exports = {
    PROJECT_PATH,
    SERVER_HOST,
    SREVER_PORT,
};
