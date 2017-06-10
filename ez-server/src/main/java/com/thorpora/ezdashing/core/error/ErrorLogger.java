/**
 * Created by Yannick Lacaute on 27/12/16.
 * Copyright 2015-2016 the original author or authors.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.thorpora.ezdashing.core.error;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.event.Level;
import org.springframework.core.annotation.AnnotationUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * When no mapping is set, exception are logged in ERROR and the stackTrace is printed.
 */
public class ErrorLogger {

    private static final Level DEFAULT_EXCEPTION_LEVEL = Level.ERROR;
    private static final boolean DEFAULT_STACK_TRACE_PRINTED = true;

    private Map<Class, Level> levelMapping = new HashMap<>();
    private Map<Class, Boolean> stackMapping = new HashMap<>();
    private Map<Class, Boolean> rootCauseMapping = new HashMap<>();

    /**
     * Map exception which must be logged in a particular level, without stackTrace
     */
    public void map(Level logLevel, Class... exceptionClasses) {
        map(logLevel, false, false, exceptionClasses);
    }

    /**
     * Map exceptions with given root cause which must be logged in a particular level, without stackTrace
     */
    public void mapRootCause(Level logLevel, Class... rootCauseClasses) {
        map(logLevel, false, true, rootCauseClasses);
    }

    /**
     * Map exception which must be logged in a particular level, with stackTrace
     */
    public void mapWithStack(Level logLevel, Class... exceptionClasses) {
        map(logLevel, true, false, exceptionClasses);
    }

    /**
     * Map exceptions with given root cause which must be logged in a particular level, with stackTrace
     */
    public void mapRootCauseWithStack(Level logLevel, Class... rootCauseClasses) {
        map(logLevel, true, true, rootCauseClasses);
    }

    /**
     * Log an exception, depending the configured mappings and the exception annotation. If no mapping is set and
     * if the exception don't use @ExceptionLog, the exception is logged in ERROR and the stackTrace is printed.
     * If the exception is mapped but use @ExceptionLog, the mapping is ignored.
     */

    /**
     * Logger an exception in a particular log level. If no mapping is set, the stackTrace is printed.
     */
    public void log(Logger logger, Throwable throwable) {
        Throwable rootCause = ExceptionUtils.getRootCause(throwable);
        Level logLevel;
        boolean printStack;
        if (rootCauseMapping.get(rootCause.getClass())) {
            logLevel = resolveLogLevel(rootCause);
            printStack = isStackTraceLogged(rootCause);
        } else {
            logLevel = resolveLogLevel(throwable);
            printStack = isStackTraceLogged(throwable);
        }
        String message = resolveMessage(throwable);

        switch (logLevel) {
            case TRACE:
                trace(logger, message, throwable, printStack);
                break;
            case DEBUG:
                debug(logger, message, throwable, printStack);
                break;
            case INFO:
                info(logger, message, throwable, printStack);
                break;
            case WARN:
                warn(logger, message, throwable, printStack);
                break;
            case ERROR:
                error(logger, message, throwable, printStack);
                break;
        }
    }

    public void logServletError(Logger logger, HttpServletRequest request, HttpServletResponse response) {
        String requestFullpath = request.getRequestURI();
        if (request.getQueryString() != null) {
            requestFullpath += "?" + request.getQueryString();
        }
        String msg = String.format("Servlet error [%s] : %s (will forward to /error)", response.getStatus(), requestFullpath);
        if (response.getStatus() >= 500) {
            logger.error(msg);
        } else {
            logger.info(msg);
        }
    }

    private String resolveMessage(Throwable throwable) {
        Throwable rootCause = ExceptionUtils.getRootCause(throwable);
        String message = throwable.getMessage();
        if (message == null) {
            message = "An exception without message has been thrown";
        }
        if (rootCause != null && rootCause != throwable) {
            message += " with root cause : " + rootCause.getMessage();
        }
        return message;
    }

    private void map(Level logLevel, boolean printStackTrace, boolean mapRootCause, Class... exceptionClasses) {
        Arrays.stream(exceptionClasses).forEach(c -> {
            levelMapping.put(c, logLevel);
            stackMapping.put(c, printStackTrace);
            rootCauseMapping.put(c, mapRootCause);
        });
    }

    private void trace(Logger logger, String message, Throwable throwable, boolean printStack) {
        if (printStack) {
            logger.trace(message, throwable);
        } else {
            logger.trace(message);
        }
    }

    private void debug(Logger logger, String message, Throwable throwable, boolean printStack) {
        if (printStack) {
            logger.debug(message, throwable);
        } else {
            logger.debug(message);
        }
    }

    private void info(Logger logger, String message, Throwable throwable, boolean printStack) {
        if (printStack) {
            logger.info(message, throwable);
        } else {
            logger.info(message);
        }
    }

    private void warn(Logger logger, String message, Throwable throwable, boolean printStack) {
        if (printStack) {
            logger.warn(message, throwable);
        } else {
            logger.warn(message);
        }
    }

    private void error(Logger logger, String message, Throwable throwable, boolean printStack) {
        if (printStack) {
            logger.error(message, throwable);
        } else {
            logger.error(message);
        }
    }

    private Level resolveLogLevel(Throwable ex) {
        ExceptionLog logAnnot = AnnotationUtils.findAnnotation(ex.getClass(), ExceptionLog.class);
        if (logAnnot != null) {
            return logAnnot.level();
        }
        Level logLevel = levelMapping.get(ex.getClass());
        if (logLevel != null) {
            return logLevel;
        }
        return DEFAULT_EXCEPTION_LEVEL;
    }

    private boolean isStackTraceLogged(Throwable ex) {
        ExceptionLog logAnnot = AnnotationUtils.findAnnotation(ex.getClass(), ExceptionLog.class);
        if (logAnnot != null) {
            return logAnnot.stackTrace();
        }
        Boolean printStack = stackMapping.get(ex.getClass());
        if (printStack != null) {
            return printStack;
        }
        return DEFAULT_STACK_TRACE_PRINTED;
    }

}
