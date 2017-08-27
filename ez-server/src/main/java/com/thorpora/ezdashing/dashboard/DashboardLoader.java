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
package com.thorpora.ezdashing.dashboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

@Slf4j
public class DashboardLoader {

    private static final String FILENAME = "dashboard.json";

    @Autowired
    private Environment env;

    public DashboardConfiguration load(ObjectMapper objectMapper) {
        byte[] encoded;
        try {
            String location = getConfigLocation();
            log.info("Loading dashboard configuration file at '{}'", location);
            encoded = Files.readAllBytes(Paths.get(location));
        } catch (IOException ex) {
            throw new AppConfigException("Dashboard config file invalid, "
                    + "please verify the property 'dashboard.configLocation'", ex);
        }
        String content = new String(encoded, Charset.forName("UTF-8"));
        return new DashboardConfiguration(content);
    }

    /**
     * We assume the dashboard.json configuration file is always in the same directory as the
     * application.properties, even if its location is defined with "spring.config.location".
     */
    private String getConfigLocation() {
        String externalConfigLocation = env.getProperty("spring.config.location");
        if (externalConfigLocation != null && !externalConfigLocation.isEmpty()) {
            String path = externalConfigLocation
                    .substring(0, externalConfigLocation.lastIndexOf('/'))
                    .replace("file:", "");
            return path + "/" + FILENAME;
        }
        return this.getClass().getClassLoader().getResource(FILENAME).getPath();
    }
}
