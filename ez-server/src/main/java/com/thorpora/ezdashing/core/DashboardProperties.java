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
import org.springframework.boot.context.properties.ConfigurationProperties;
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

    private String configLocation;

    public String getDashboardConfig() {
        byte[] encoded;
        try {
            encoded = Files.readAllBytes(Paths.get(configLocation));
        } catch (IOException e) {
            throw new AppConfigException("Dashboard config file invalid, please verify the property 'dashboard.config'");
        }
        return new String(encoded, Charset.forName("UTF-8"));
    }
}
