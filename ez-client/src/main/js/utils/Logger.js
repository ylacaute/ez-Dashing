import StringUtils from 'utils/StringUtils';

export default class Logger {

  static ENABLE_COLOR = false;
  static ROOT_LOGGER_NAME = "ROOT_LOGGER_NAME";
  static LOG_ON_CONSOLE = true;

  static Level = {
    TRACE: [0, 'TRACE', 'color:green'],
    DEBUG: [1, 'DEBUG', 'color:orange'],
    INFO: [2, 'INFO', 'color:black'],
    WARN: [3, 'WARN', 'color:red'],
    ERROR: [4, 'ERROR', 'color:red'],
  };

  static LevelMap = {
    [Logger.ROOT_LOGGER_NAME]: Logger.Level.INFO
  };

  static setLevel(loggerName, level) {
    Logger.LevelMap[loggerName] = level;
  }

  static getLevel(loggerName) {
    return Logger.LevelMap[loggerName];
  };

  static setRootLevel(level) {
    Logger.LevelMap[Logger.ROOT_LOGGER_NAME] = level;
  }

  static getRootLevel() {
    return Logger.LevelMap[Logger.ROOT_LOGGER_NAME];
  }

  static getLogger(loggerName) {
    if (loggerName == null) {
      return new Logger(Logger.ROOT_LOGGER_NAME);
    }
    return new Logger(loggerName);
  };

  constructor(loggerName) {
    this.name = loggerName;
  }

  trace() {
    return this.consoleLog(Logger.Level.TRACE, arguments);
  }

  debug() {
    return this.consoleLog(Logger.Level.DEBUG, arguments);
  }

  info() {
    return this.consoleLog(Logger.Level.INFO, arguments);
  }

  warn() {
    return this.consoleLog(Logger.Level.WARN, arguments);
  }

  error() {
    return this.consoleLog(Logger.Level.ERROR, arguments);
  }

  consoleLog(msgLevel, args) {
    const logObj = this.generateLog(msgLevel, args);
    if (logObj != null) {
      if (Logger.LOG_ON_CONSOLE) {
        if (Logger.ENABLE_COLOR) {
          console.log("%c " + logObj.log, msgLevel[2], ...logObj.argsArrayForConsole);
        } else {
          console.log(logObj.log, ...logObj.argsArrayForConsole);
        }
      }
      return logObj.log;
    }
    return null;
  }

  /**
   * Generate a log object which contains the log string (log) and an array of arguments which have
   * to be given directly to console.log (because no {} found in the template message. This allow the user
   * to parametrize its log line as any class logger or to write full object in the console output (feature
   * handled by the browser).
   */
  generateLog(msgLevel, args) {
    const refLevel = Logger.getLevel(this.name) || Logger.getRootLevel();
    const shouldLog = msgLevel[0] >= refLevel[0];

    if (!shouldLog) {
      return null;
    }
    let message = Array.prototype.shift.call(args);
    let messageParamsCount = StringUtils.countSubString(message, "{}");
    let argsArray = Array.prototype.slice.call(args);
    let argsArrayForConsole = [];

    if (messageParamsCount < argsArray.length) {
      argsArrayForConsole = argsArray.slice(messageParamsCount, argsArray.length);
    }

    let formattedMessage = StringUtils.format(message, argsArray);
    let log;

    if (this.name == Logger.ROOT_LOGGER_NAME) {
      log = StringUtils.format("[{}] {}", msgLevel[1], formattedMessage);
    } else {
      log = StringUtils.format("[{}] {}: {}", msgLevel[1], this.name, formattedMessage);
    }
    return {
      log: log,
      argsArrayForConsole: argsArrayForConsole
    };
  }

}
