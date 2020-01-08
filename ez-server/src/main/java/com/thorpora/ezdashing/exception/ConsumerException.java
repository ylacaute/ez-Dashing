package com.thorpora.ezdashing.exception;

import com.thorpora.ezdashing.utils.spring.error.ExceptionLog;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
@ExceptionLog(stackTrace = false)
public class ConsumerException extends ApplicationException {

    public ConsumerException(String message) {
        super(message);
    }
}
