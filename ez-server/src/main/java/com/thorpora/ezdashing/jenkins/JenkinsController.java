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
package com.thorpora.ezdashing.jenkins;

import com.offbytwo.jenkins.JenkinsServer;
import com.offbytwo.jenkins.helper.JenkinsVersion;
import com.offbytwo.jenkins.model.BuildWithDetails;
import com.offbytwo.jenkins.model.FolderJob;
import com.offbytwo.jenkins.model.Job;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

@RequestMapping("/api/jenkins")
@RestController
public class JenkinsController {

    private static final Logger logger = LoggerFactory.getLogger(JenkinsController.class);

    private JenkinsClient client;

    @Autowired
    public JenkinsController(JenkinsClient client) {
        this.client = client;
    }

    /**
     * Sample result : {"literalVersion" : "1.642.4"}
     */
    @GetMapping("/version")
    public JenkinsVersion getVersion() {
        return client.getVersion();
    }

    @GetMapping("/lastBuild/{jobName}/{branch}")
    public LastBuild getLastBuild(
            @PathVariable String jobName,
            @PathVariable String branch) throws IOException {
        // TODO: LOG REQUEST WITH AOP
        logger.debug("GET /api/jenkins/lastBuild/{}/{}", jobName, branch);
        return client.getLastBuild(jobName, branch);
    }



}
