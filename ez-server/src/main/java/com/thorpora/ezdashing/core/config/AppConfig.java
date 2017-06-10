/**
 * Created by Yannick Lacaute on 17/05/17.
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
package com.thorpora.ezdashing.core.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thorpora.ezdashing.core.StartupListener;
import com.thorpora.ezdashing.core.error.ErrorLogger;
import org.slf4j.event.Level;
import org.sonar.wsclient.connectors.ConnectionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.net.ConnectException;

@Configuration
public class AppConfig {

    @Bean
    public StartupListener startupListener() {
        return new StartupListener();
    }

    @Bean
    public ErrorLogger errorLogger() {
        ErrorLogger errorLogger = new ErrorLogger();
        errorLogger.map(Level.ERROR, ConnectionException.class);
        errorLogger.mapRootCause(Level.ERROR, ConnectException.class);
        return errorLogger;
    }

    @Bean
    public ObjectMapper ObjectMapper() {
        return new ObjectMapper();
    }

    @Autowired
    public void configureJackson(Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder) {
        jackson2ObjectMapperBuilder.serializationInclusion(JsonInclude.Include.NON_NULL);
        jackson2ObjectMapperBuilder.indentOutput(true);
    }

}
