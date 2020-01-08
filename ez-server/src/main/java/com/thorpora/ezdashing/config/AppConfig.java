package com.thorpora.ezdashing.config;

import com.thorpora.ezdashing.AppStartupListener;
import com.thorpora.ezdashing.utils.spring.error.ErrorLogger;
import feign.FeignException;
import feign.RetryableException;
import org.slf4j.event.Level;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.ConnectException;

@Configuration
public class AppConfig {

    static {
        com.jayway.jsonpath.Configuration.setDefaults(new JsonPathConfig());
    }

    @Bean
    public AppStartupListener startupListener() {
        return new AppStartupListener();
    }

    @Bean
    public ErrorLogger errorLogger() {
        ErrorLogger errorLogger = new ErrorLogger();
        errorLogger.mapRootCause(Level.ERROR, ConnectException.class);
        errorLogger.mapRootCause(Level.ERROR, RetryableException.class);
        errorLogger.mapRootCause(Level.ERROR, FeignException.class);
        return errorLogger;
    }

}
