/**
 * Created by Yannick Lacaute on 23/12/16.
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

import org.springframework.http.HttpStatus;

import java.util.Map;

public class ErrorDTOBuilder {

    private static final String ATTR_NO_MESSAGE = "No message available";
    private static final String ATTR_NO_ERROR = "None";

    private Integer statusCode;
    private String attrMessage;
    private String attrError;
    private String attrTimeStamp;
    private String attrPath;
    private String message;
    private String requestURI;
    private String requestParams;
    private boolean silent = true;

    private ErrorDTOBuilder() {
    }

    public static ErrorDTOBuilder create() {
        return new ErrorDTOBuilder();
    }

    public ErrorDTOBuilder silent(boolean value) {
        this.silent = value;
        return this;
    }

    public ErrorDTOBuilder withStatusCode(int statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    public ErrorDTOBuilder withMessage(String message) {
        this.message = message;
        return this;
    }

    public ErrorDTOBuilder withRequestURI(String requestURI) {
        this.requestURI = requestURI;
        return this;
    }

    public ErrorDTOBuilder withRequestParam(String requestParams) {
        this.requestParams = requestParams;
        return this;
    }

    public ErrorDTOBuilder withErrorAttributes(Map<String, Object> errorAttributes) {
        this.attrMessage = (String) errorAttributes.get("message");
        this.attrPath = (String) errorAttributes.get("path");
        this.attrError = (String) errorAttributes.get("error");
        this.attrTimeStamp = errorAttributes.get("timestamp").toString();
        return this;
    }

    public ErrorDTO build() {
        ErrorDTO error = new ErrorDTO();
        error.setTimeStamp(attrTimeStamp);
        error.setPath(resolvePath());
        error.setMessage(resolveMessage());
        return error;
    }

    private String resolvePath() {
        String path = requestURI;
        if (path == null) {
            path = attrPath;
        }
        if (requestParams != null) {
            path += "?" + requestParams.toString();
        }
        return path;
    }

    private String resolveMessage() {
        if (!silent) {
            if (message != null) {
                return message;
            }
            if (!ATTR_NO_MESSAGE.equals(attrMessage))
                return attrMessage;
            if (!ATTR_NO_ERROR.equals(attrError)) {
                return attrError;
            }
        }
        return HttpStatus.valueOf(statusCode).getReasonPhrase();
    }


}
