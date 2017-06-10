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
package com.thorpora.ezdashing.core;

import com.thorpora.ezdashing.core.config.AppConfigException;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "dashboard")
public class DashboardProperties {

    private static final Logger logger = LoggerFactory.getLogger(DashboardProperties.class);

    /**
     * When using docker, the configuration is always in this directory (volume) so
     * the user doesn't have to precise this property in this server.properties.
     */
    private static final String FILENAME = "dashboard.json";

    private String configLocation;

    @Autowired
    private Environment env;

    public String getDashboardConfig() {
        byte[] encoded;
        try {
            logger.info("Loading dashboard configuration file at '{}'", getConfigLocation());
            encoded = Files.readAllBytes(Paths.get(getConfigLocation()));
        } catch (IOException ex) {
            throw new AppConfigException("Dashboard config file invalid, "
                    + "please verify the property 'dashboard.configLocation'", ex);
        }
        return new String(encoded, Charset.forName("UTF-8"));
    }

    /**
     * When we are using an external spring configuration (like with Docker), we assume the dashboard
     * configuration is necessary in the same directory.
     */
    public String getConfigLocation() {
        String externalConfigLocation = env.getProperty("spring.config.location");
        if (externalConfigLocation != null && !externalConfigLocation.isEmpty()) {
            String path = externalConfigLocation
                    .substring(0, externalConfigLocation.lastIndexOf('/'))
                    .replace("file:", "");
            return path + "/" + FILENAME;
        }
        return configLocation;
    }
}
