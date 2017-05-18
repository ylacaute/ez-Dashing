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
package com.thorpora.ezdashing;

import com.thorpora.ezdashing.jenkins.JenkinsProperties;
import com.thorpora.ezdashing.sonar.SonarProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

public class StartupListener {

    private final static Logger logger = LoggerFactory.getLogger(StartupListener.class);

    @Autowired
    private JenkinsProperties jenkinsProperties;

    @Autowired
    private SonarProperties sonarProperties;

    @EventListener(ContextRefreshedEvent.class)
    public void devContextRefreshedEvent() {
        logger.info("Jenkins baseUrl: {}", jenkinsProperties.getBaseUrl());
        logger.info("Jenkins username: {}", jenkinsProperties.getUserName());
        logger.info("Sonar baseUrl: {}", sonarProperties.getBaseUrl());
        logger.info("Application ready");
    }

}