
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err);
    // call Sentry for example :
    /*Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });*/
    throw err
  }
};

export default crashReporter;
