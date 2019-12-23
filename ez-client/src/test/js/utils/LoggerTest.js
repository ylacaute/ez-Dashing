import Logger from "utils/Logger";

describe("Logger", () => {

  Logger.LOG_ON_CONSOLE = false;

  it("getLogger() without args should return the root Logger", () => {
    let logger = Logger.getLogger();
    expect(logger.name).toStrictEqual(Logger.ROOT_LOGGER_NAME);
  });

  it("log with Root logger set as INFO", () => {
    let logger = Logger.getLogger();
    Logger.setRootLevel(Logger.Level.INFO);

    let trace = logger.trace("Should be ignored");
    let debug = logger.debug("Should be ignored");
    let info = logger.info("This is info");
    let warn = logger.warn("This is warn");
    let error = logger.error("This is error");

    expect(trace).toStrictEqual(null);
    expect(debug).toStrictEqual(null);
    expect(info).toStrictEqual("[INFO] This is info");
    expect(warn).toStrictEqual("[WARN] This is warn");
    expect(error).toStrictEqual("[ERROR] This is error");
  });

  it("log with Root logger set as WARN", () => {
    let logger = Logger.getLogger();
    Logger.setRootLevel(Logger.Level.WARN);

    let trace = logger.trace("Should be ignored");
    let debug = logger.debug("Should be ignored");
    let info = logger.info("Should be ignored");
    let warn = logger.warn("This is another warn");
    let error = logger.error("This is error");

    expect(trace).toStrictEqual(null);
    expect(debug).toStrictEqual(null);
    expect(info).toStrictEqual( null);
    expect(warn).toStrictEqual("[WARN] This is another warn");
    expect(error).toStrictEqual("[ERROR] This is error");
  });


  it("info() with a logger name but with rootLevel set to INFO", () => {
    Logger.setRootLevel(Logger.Level.INFO);

    let logger = Logger.getLogger("Sample");
    let msg = logger.info("Hello World");

    expect(msg).toStrictEqual("[INFO] Sample: Hello World");
  });

  it("debug() with a logger name but with rootLevel set to INFO", () => {
    Logger.setRootLevel(Logger.Level.INFO);

    let logger = Logger.getLogger("Sample");
    let msg = logger.debug("Hello World");

    expect(msg).toStrictEqual(null);
  });

  it("info() with a logger name and a specific level", () => {
    Logger.setRootLevel(Logger.Level.INFO);
    Logger.setLevel("Sample", Logger.Level.TRACE);
    let logger = Logger.getLogger("Sample");

    let trace = logger.trace("trace");
    let debug = logger.debug("debug");
    let info = logger.info("info");
    let warn = logger.warn("warn");
    let error = logger.error("error");

    expect(trace).toStrictEqual("[TRACE] Sample: trace");
    expect(debug).toStrictEqual("[DEBUG] Sample: debug");
    expect(info).toStrictEqual("[INFO] Sample: info");
    expect(warn).toStrictEqual("[WARN] Sample: warn");
    expect(error).toStrictEqual("[ERROR] Sample: error");
  });

  it("info() with one parameter", () => {
    Logger.setRootLevel(Logger.Level.INFO);
    Logger.setLevel("Sample", Logger.Level.TRACE);
    let logger = Logger.getLogger("Sample");

    let trace = logger.trace("Hello {}", "World");

    expect(trace).toStrictEqual("[TRACE] Sample: Hello World");
  });

  it("info() with two parameters", () => {
    Logger.setRootLevel(Logger.Level.INFO);
    Logger.setLevel("Sample", Logger.Level.TRACE);
    let logger = Logger.getLogger("Sample");

    let trace = logger.trace("{}Hello {}", "=>", "World");

    expect(trace).toStrictEqual("[TRACE] Sample: =>Hello World");
  });
});

