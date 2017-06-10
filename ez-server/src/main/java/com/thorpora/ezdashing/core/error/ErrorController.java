/**
 * Created by Yannick Lacaute on 22/12/16.
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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.AbstractErrorController;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * The goal of {@link ErrorController} is to catch ALL errors, including
 * servlet error not catchable in ControllerAdvice, and to give a clean API, 100% json.
 */
@RestController
@ControllerAdvice
@RequestMapping("${server.error.path:${error.path:/error}}")
public class ErrorController extends AbstractErrorController {

    private final static Logger logger = LoggerFactory.getLogger(ErrorController.class);

    private static final boolean LOG_SERVLET_ERRORS = true;
    private static final boolean INCLUDE_STACK_TRACE_IN_DTO = false;
    private static final boolean DEFAULT_SILENT_EXCEPTION = true;
    private static final HttpStatus DEFAULT_STATUS_EXCEPTION = HttpStatus.INTERNAL_SERVER_ERROR;

    private ErrorLogger errorLogger;

    public ErrorController(ErrorLogger errorLogger, ErrorAttributes errorAttributes) {
        super(errorAttributes);
        this.errorLogger = errorLogger;
    }

    /**
     * Most of the time we will catch functional exception. As each exception defines its http status code
     * by default we always set the message in the {@link ErrorDTO} in order to help the caller.
     * <p>
     * If for some reason, in a very specific case we don't want to send the default http code defined
     * in the exception or if we don't want to set the message to the client, we just have to define
     * a specific exception handler to override the default behaviour defined here.
     */
    @ExceptionHandler(Throwable.class)
    public ResponseEntity<ErrorDTO> onException(HttpServletRequest request, HttpServletResponse response, Throwable ex) {
        HttpStatus status = getHttpStatus(ex);
        response.setStatus(status.value());
        errorLogger.log(logger, ex);

        ErrorDTO jsonError = ErrorDTOBuilder.create()
                .withErrorAttributes(getErrorAttributes(request, INCLUDE_STACK_TRACE_IN_DTO))
                .withStatusCode(status.value())
                .withMessage(ex.getMessage())
                .withRequestURI(request.getRequestURI())
                .withRequestParam(request.getQueryString())
                .silent(isSilent(ex))
                .build();

        return ResponseEntity
                .status(status)
                .body(jsonError);
    }

    /**
     * Call {@code #silentException} with a httpStatus depending on the exception.
     */
    public ResponseEntity<ErrorDTO> silentException(HttpServletRequest request, HttpServletResponse response, Exception ex) {
        return silentException(request, response, ex, getHttpStatus(ex));
    }

    /**
     * For security reason, sometimes we don't want to give any error details to the client because of
     * a very unusual use case.
     */
    public ResponseEntity<ErrorDTO> silentException(HttpServletRequest request, HttpServletResponse response, Exception ex, HttpStatus status) {
        errorLogger.log(logger, ex);
        response.setStatus(status.value());

        ErrorDTO jsonError = ErrorDTOBuilder.create()
                .withErrorAttributes(getErrorAttributes(request, INCLUDE_STACK_TRACE_IN_DTO))
                .withStatusCode(status.value())
                .withRequestURI(request.getRequestURI())
                .withRequestParam(request.getQueryString())
                .silent(true)
                .build();

        return ResponseEntity
                .status(status)
                .body(jsonError);
    }

    /**
     * This is the last error handler. The main goal is to handle servlet errors (not found, exception during
     * servlet filter, etc). Usually you never reach this code : all exceptions are caught earlier.
     */
    @RequestMapping
    public ErrorDTO onServletError(HttpServletRequest request, HttpServletResponse response) {
        if (LOG_SERVLET_ERRORS)
            errorLogger.logServletError(logger, request, response);
        return ErrorDTOBuilder.create()
                .withErrorAttributes(getErrorAttributes(request, INCLUDE_STACK_TRACE_IN_DTO))
                .withRequestParam(request.getQueryString())
                .silent(false)
                .build();
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }

    private HttpStatus getHttpStatus(Throwable ex) {
        ResponseStatus annot = AnnotationUtils.findAnnotation(ex.getClass(), ResponseStatus.class);
        if (annot != null) {
            return annot.code();
        }
        if (ex instanceof HttpRequestMethodNotSupportedException ||
                ex instanceof MethodArgumentTypeMismatchException) {
            return HttpStatus.BAD_REQUEST;
        }
        return DEFAULT_STATUS_EXCEPTION;
    }

    private boolean isSilent(Throwable ex) {
        SilentException annot = AnnotationUtils.findAnnotation(ex.getClass(), SilentException.class);
        if (annot != null) {
            return annot.value();
        }
        return DEFAULT_SILENT_EXCEPTION;
    }

}