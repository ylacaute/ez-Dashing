import Logger from "utils/Logger";

const logger = Logger.getLogger("LoggerMiddleware");

const loggerMiddleware = store => next => action => {
  logger.trace('dispatching:', action);
  let result = next(action);
  logger.trace('next state:', store.getState());
  return result;
};

export default loggerMiddleware;
