import moment from 'moment';
import pino from 'pino';
import { APPLICATION_NAME } from './config';

const logLevel = process.env.LOG_LEVEL || 'info';
const logConfig = {
  name: APPLICATION_NAME,
  level: logLevel,
  timestamp: () => `,"time":"${moment.utc()}"`,
  formatters: {
    level(lable: string) {
      return { level: lable };
    },
  },
};

const logger = pino(logConfig);
export default logger;
