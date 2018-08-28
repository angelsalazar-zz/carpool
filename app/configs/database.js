const serviceLocator = require('../lib/service_locator');
const logger = serviceLocator.get('logger');

class Database {
    constructor (mongodbURI) {
        this.mongoose = serviceLocator.get('mongoose');
        this._connect(mongodbURI);
    }

    _connect (mongodbURI) {
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(mongodbURI);
        const { connection } = this.mongoose;

        connection.on('connected', () =>
            logger.info('Database Connection was Successful')
        );
        connection.on('error', (err) =>
            logger.info('Database Connection Failed: ' + err)
        );
        connection.on('disconnected', () =>
            logger.info('Database Connection Disconnected')
        );
        process.on('SIGINT', () => {
            connection.close();
            logger.info(
                'Mongoose disconnected through app terminantion (SIGINT)'
            );
            process.exit(0);
        });
        
        process.on("SIGTERM", () => {
            connection.close();
            logger.info(
                'Mongoose disconnected through app terminantion (SIGTERM)'
            );
            process.exit(0);
        });
          
        process.once("SIGUSR2", () => {
            connection.close();
            logger.info(
                'Mongoose disconnected through app terminantion (SIGUSR2)'
            );
            process.kill(process.pid,'SIGUSR2');
        });

        // initialize Model
        // require('../models/Users');
    }
}

module.exports = Database;