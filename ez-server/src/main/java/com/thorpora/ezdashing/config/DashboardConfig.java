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
package com.thorpora.ezdashing.config;

import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import com.thorpora.ezdashing.exception.DashboardConfigNotFound;
import com.thorpora.ezdashing.exception.MissingApplicationArgumentException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.io.File;
import java.io.FileNotFoundException;

import static java.io.File.separator;
import static java.lang.String.format;
import static org.springframework.util.ResourceUtils.getFile;

@Slf4j
@Configuration
public class DashboardConfig {

    private static final String FILENAME = "dashboard.json";
    private static final String LOCATION_PROP_KEY = "spring.config.additional-location";

    @Bean
    public DashboardConfiguration dashboardConfiguration(Environment env) {
        return new DashboardConfiguration(getConfigFile(env));
    }

    /**
     * We assume the dashboard.json configuration file is always in the same directory as the application.yml.
     */
    private File getConfigFile(Environment env) {
        String location = env.getProperty(LOCATION_PROP_KEY);
        log.debug("{} is set to '{}'", LOCATION_PROP_KEY, location);
        if (location == null || location.isEmpty()) {
            throw new MissingApplicationArgumentException(format("No arg '%s' defined", LOCATION_PROP_KEY));
        }
        try {
            File file = getFile(location + FILENAME);
            if (!file.exists()) {
                throw new DashboardConfigNotFound(format(
                        "Unable to locate the dashboard configuration from location '%s'", location));
            }
            return file;
        } catch (FileNotFoundException ex) {
            throw new DashboardConfigNotFound(format(
                    "Unable to locate the dashboard configuration from location '%s'", location));
        }
    }

}
