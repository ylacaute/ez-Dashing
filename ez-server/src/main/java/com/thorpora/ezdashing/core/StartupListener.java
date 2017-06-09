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

import com.thorpora.ezdashing.jenkins.JenkinsProperties;
import com.thorpora.ezdashing.jira.JiraProperties;
import com.thorpora.ezdashing.sonar.SonarProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

import java.util.Arrays;

@Profile("production")
public class StartupListener {

    private final static Logger logger = LoggerFactory.getLogger(StartupListener.class);

    @Autowired
    private Environment env;

    @Autowired
    private JenkinsProperties jenkinsProperties;

    @Autowired
    private SonarProperties sonarProperties;

    @Autowired
    private JiraProperties jiraProperties;

    @Autowired
    private DashboardProperties dashboardProperties;

    @EventListener(ContextRefreshedEvent.class)
    public void devContextRefreshedEvent() {
        logger.info("Jenkins baseUrl: {}", jenkinsProperties.getBaseUrl());
        logger.info("Jenkins username: {}", jenkinsProperties.getUserName());
        logger.info("Sonar baseUrl: {}", sonarProperties.getBaseUrl());
        logger.info("Sonar username: {}", sonarProperties.getUserName());
        logger.info("Jira baseUrl: {}", jiraProperties.getBaseUrl());
        logger.info("Jira username: {}", jiraProperties.getUserName());
        if (isProduction()) {
            // Verify the dashboard config is loadable
            dashboardProperties.getDashboardConfig();
            logger.info("Dashboard config file found: {}.", dashboardProperties.getConfigLocation());
        } else {
            logger.info("Dashboard config location: {}", dashboardProperties.getConfigLocation());
        }
    }

    private boolean isProduction() {
        return Arrays.stream(env.getActiveProfiles()).anyMatch(p -> p.equals("prod"));
    }

}