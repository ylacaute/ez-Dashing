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
package com.thorpora.ezdashing.sonar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sonar.wsclient.Host;
import org.sonar.wsclient.Sonar;
import org.sonar.wsclient.connectors.HttpClient4Connector;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SonarConfig {

    private static final Logger logger = LoggerFactory.getLogger(SonarConfig.class);

    /*
    We can't create a singleton since this version doesn't manage multi thread correctly -_-
    TODO : replace connection manager and try to use a single sonar server instance
    @Bean
    public Sonar Sonar(SonarProperties sonarProperties) {
        logger.debug("Creating Sonar client...");
        Host server = new Host(sonarProperties.getBaseUrl(), sonarProperties.getUserName(), sonarProperties.getPassword()); //, sonarProperties.getUserName(), sonarProperties.getPassword()
        Sonar sonar = new Sonar(new HttpClient4Connector(server));
        return sonar;
    }
    */

    /*
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
                cm.setMaxTotal(20);
                cm.setDefaultMaxPerRoute(20);
                HttpHost localhost = new HttpHost("locahost", 80);
                cm.setMaxPerRoute(new HttpRoute(localhost), 50);
                CloseableHttpClient httpClient = HttpClients.custom()
                .setConnectionManager(cm)
                .build();
    */

}
