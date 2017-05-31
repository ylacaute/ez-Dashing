/**
 * Created by Yannick Lacaute on 31/05/17.
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
package com.thorpora.ezdashing.jira;

import com.atlassian.jira.rest.client.api.JiraRestClient;
import com.atlassian.jira.rest.client.api.domain.User;
import com.atlassian.util.concurrent.Promise;
import com.thorpora.ezdashing.sonar.JiraProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

// https://bitbucket.org/jaysee00/jrjc-example-client/src/e01e0da6d72e06aa21b0a8fe5c23d62b97192ca9/standalone/src/main/java/com/atlassian/jira/examples/Main.java?at=master&_ga=2.117005199.801030348.1496224908-1696540088.1494783443&fileviewer=file-view-default


@Service
public class JiraClient {

    private static final Logger logger = LoggerFactory.getLogger(JiraClient.class);

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:MM");

    private JiraProperties properties;
    private JiraRestClient jira;

    @Autowired
    public JiraClient(JiraProperties properties, JiraRestClient jira) {
        this.properties = properties;
        this.jira = jira;
    }

    public User test() {
        Promise<User> promise = jira.getUserClient().getUser(properties.getUserName());
        User user = promise.claim();
        System.out.println(String.format("Your admin user's email address is: %s\r\n", user.getEmailAddress()));
        System.out.println("Example complete. Now exiting.");
        return user;
    }

}
