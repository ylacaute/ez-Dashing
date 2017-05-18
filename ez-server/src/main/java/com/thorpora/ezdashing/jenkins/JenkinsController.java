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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jenkins")
public class JenkinsController {

    private JenkinsProperties properties;
    private JenkinsServer server;

    @Autowired
    public JenkinsController(JenkinsProperties properties, JenkinsServer server) {
        this.properties = properties;
        this.server = server;
    }

    @GetMapping("/version")
    public JenkinsVersion getVersion() {
        assertServerIsRunning();
        return server.getVersion();
    }

    private void assertServerIsRunning() {
        if (!server.isRunning()) {
            throw new JenkinsException("server is not running !");
        }
    }

}
