import Logger from "utils/Logger";
import { assert } from "chai";

describe("Logger", () => {

  Logger.LOG_ON_CONSOLE = false;

  it("getLogger() without args should return the root Logger", () => {
    let logger = Logger.getLogger();
    assert.equal(logger.name, Logger.ROOT_LOGGER_NAME);
  });

  it("log with Root logger set as INFO", () => {
    let logger = Logger.getLogger();
    Logger.setRootLevel(Logger.Level.INFO);

    let trace = logger.trace("Should be ignored");
    let debug = logger.debug("Should be ignored");
    let info = logger.info("This is info");
    let warn = logger.warn("This is warn");
    let error = logger.error("This is error");

    assert.equal(trace, null);
    assert.equal(debug, null);
    assert.equal(info, "[INFO] This is info");
    assert.equal(warn, "[WARN] This is warn");
    assert.equal(error, "[ERROR] This is error");
  });

  it("log with Root logger set as WARN", () => {
    let logger = Logger.getLogger();
    Logger.setRootLevel(Logger.Level.WARN);

    let trace = logger.trace("Should be ignored");
    let debug = logger.debug("Should be ignored");
    let info = logger.info("Should be ignored");
    let warn = logger.warn("This is warn");
    let error = logger.error("This is error");

    assert.equal(trace, null);
    assert.equal(debug, null);
    assert.equal(info, null);
    assert.equal(warn, "[WARN] This is warn");
    assert.equal(error, "[ERROR] This is error");
  });


  it("info() with a logger name but with rootLevel set to INFO", () => {
    Logger.setRootLevel(Logger.Level.INFO);

    let logger = Logger.getLogger("Sample");
    let msg = logger.info("Hello World");

    assert.equal(msg, "[INFO] Sample: Hello World");
  });

  it("debug() with a logger name but with rootLevel set to INFO", () => {
    Logger.setRootLevel(Logger.Level.INFO);

    let logger = Logger.getLogger("Sample");
    let msg = logger.debug("Hello World");

    assert.equal(msg, null);
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

    assert.equal(trace, "[TRACE] Sample: trace");
    assert.equal(debug, "[DEBUG] Sample: debug");
    assert.equal(info, "[INFO] Sample: info");
    assert.equal(warn, "[WARN] Sample: warn");
    assert.equal(error, "[ERROR] Sample: error");
  });

  it("info() with one parameter", () => {
    Logger.setRootLevel(Logger.Level.INFO);
    Logger.setLevel("Sample", Logger.Level.TRACE);
    let logger = Logger.getLogger("Sample");

    let trace = logger.trace("Hello {}", "World");

    assert.equal(trace, "[TRACE] Sample: Hello World");
  });

  it("info() with two parameters", () => {
    Logger.setRootLevel(Logger.Level.INFO);
    Logger.setLevel("Sample", Logger.Level.TRACE);
    let logger = Logger.getLogger("Sample");

    let trace = logger.trace("{}Hello {}", "=>", "World");

    assert.equal(trace, "[TRACE] Sample: =>Hello World");
  });
});

