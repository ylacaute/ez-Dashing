export default class WindowUtils {

  static resizeTimeout = null;

  static onResizeEnd = (callback) => {

    window.onresize = function () {
      if (WindowUtils.resizeTimeout) {
        clearTimeout(WindowUtils.resizeTimeout);
      }
      WindowUtils.resizeTimeout = setTimeout(function () {
        callback();
      }, 100);
    };

  };
}

