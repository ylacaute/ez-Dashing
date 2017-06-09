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

import com.thorpora.ezdashing.jenkins.dto.JenkinsMonitoring;
import com.thorpora.ezdashing.jenkins.dto.JenkinsLastBuild;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

// TODO: LOG REQUEST WITH AOP
@RequestMapping("/api/jenkins")
@RestController
public class JenkinsController {

    private static final Logger logger = LoggerFactory.getLogger(JenkinsController.class);

    private JenkinsClient client;

    @Autowired
    public JenkinsController(JenkinsClient client) {
        this.client = client;
    }

    @GetMapping("/version")
    public String getVersion() {
        return client.getVersion().getLiteralVersion();
    }

    @GetMapping("/monitoring")
    public JenkinsMonitoring getMonitoring() {
        logger.info("GET /api/jenkins/monitoring");
        JenkinsMonitoring result = client.getMonitoring();
        logger.debug("Response for Jenkins: {}", result);
        return result;
    }

    @GetMapping("/lastBuild/{jobName}/{branch}")
    public JenkinsLastBuild getLastBuild(
            @PathVariable String jobName,
            @PathVariable String branch) throws IOException {
        logger.info("GET /api/jenkins/lastBuild/{}/{}", jobName, branch);
        JenkinsLastBuild result = client.getLastBuild(jobName, branch);
        logger.debug("Response for Jenkins: {}", result);
        return result;
    }

}
