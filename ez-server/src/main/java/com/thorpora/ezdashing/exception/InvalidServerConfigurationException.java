package com.thorpora.ezdashing.exception;

import com.thorpora.ezdashing.utils.spring.error.ExceptionLog;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * In the absolute, this error should be a 500. But because it is a configuration problem,
 * we prefer considering it is a "user problem" not a "server problem".
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
@ExceptionLog(stackTrace = false)
public class InvalidServerConfigurationException extends ApplicationException {

  public InvalidServerConfigurationException(String message) {
    super(message);
  }

}
