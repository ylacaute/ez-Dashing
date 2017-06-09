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
package com.thorpora.ezdashing.jenkins;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.offbytwo.jenkins.JenkinsServer;
import com.offbytwo.jenkins.helper.JenkinsVersion;
import com.offbytwo.jenkins.model.BuildWithDetails;
import com.offbytwo.jenkins.model.FolderJob;
import com.offbytwo.jenkins.model.Job;
import com.thorpora.ezdashing.jenkins.dto.JenkinsLastBuild;
import com.thorpora.ezdashing.jenkins.dto.JenkinsMonitoring;
import com.thorpora.ezdashing.jenkins.mapper.JenkinsMonitoringMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.TimeZone;

@Service
public class JenkinsClient {

    private static final Logger logger = LoggerFactory.getLogger(JenkinsClient.class);

    private JenkinsProperties properties;
    private JenkinsServer jenkins;
    private JenkinsPluginsAPI jenkinsPluginsAPI;
    private ObjectMapper mapper;

    @Autowired
    public JenkinsClient(
            JenkinsProperties properties,
            JenkinsServer jenkinsServer,
            JenkinsPluginsAPI jenkinsPluginsAPI) {
        this.properties = properties;
        this.jenkins = jenkinsServer;
        this.jenkinsPluginsAPI = jenkinsPluginsAPI;
        this.mapper = new ObjectMapper();
    }

    public JenkinsVersion getVersion() {
        return jenkins.getVersion();
    }

    public JenkinsMonitoring getMonitoring() {
        try {
            return JenkinsMonitoringMapper.map(mapper.readTree(jenkinsPluginsAPI.getMonitoring()));
        } catch (Exception ex) {
            throw new JenkinsException("Error during jenkins monitoring request", ex);
        }
    }

    public JenkinsLastBuild getLastBuild(String jobName, String branch) {
        BuildWithDetails details = getBuildWithDetails(jobName, branch);
        String lastUpdate = Instant
                .ofEpochMilli(details.getTimestamp())
                .atZone(TimeZone.getDefault().toZoneId())
                .format(JenkinsConfig.DATE_FORMATTER);
        String author = details.getCulprits().isEmpty() ? "" :details.getCulprits().get(0).getFullName();
        return JenkinsLastBuild.builder()
                .jobName(jobName)
                .branch(branch)
                .id(details.getId())
                .lastUpdate(lastUpdate)
                .duration(details.getDuration())
                .estimatedDuration(details.getEstimatedDuration())
                .progress(75)
                .author(author)
                .state(details.getResult().toString())
                .build();
    }

    private BuildWithDetails getBuildWithDetails(String jobName, String branch) {
        try {
            String jobUrl = properties.getJobBaseUrl() + jobName;
            jenkins.getJob(jobName);
            FolderJob folder = new FolderJob(jobName, jobUrl);
            Job job = jenkins.getJobs(folder).get(branch);
            return job.details().getLastBuild().details();
        } catch (IOException ex) {
            throw new JenkinsException("Error during jenkins build request", ex);
        }
    }

}
