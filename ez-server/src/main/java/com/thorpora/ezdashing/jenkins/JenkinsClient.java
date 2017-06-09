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

import com.offbytwo.jenkins.JenkinsServer;
import com.offbytwo.jenkins.client.JenkinsHttpClient;
import com.offbytwo.jenkins.helper.JenkinsVersion;
import com.offbytwo.jenkins.model.BaseModel;
import com.offbytwo.jenkins.model.BuildWithDetails;
import com.offbytwo.jenkins.model.FolderJob;
import com.offbytwo.jenkins.model.Job;
import com.thorpora.ezdashing.jenkins.monitoring.JenkinsMonitoring;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

@Service
public class JenkinsClient {

    private static final Logger logger = LoggerFactory.getLogger(JenkinsClient.class);

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:MM");

    private JenkinsProperties properties;
    private JenkinsServer jenkins;
    private JenkinsHttpClient jenkinsHttpClient;

    @Autowired
    public JenkinsClient(JenkinsProperties properties, JenkinsHttpClient jenkinsHttpClient) {
        this.properties = properties;
        this.jenkins = new JenkinsServer(jenkinsHttpClient);
        this.jenkinsHttpClient = jenkinsHttpClient;
    }

    public JenkinsMonitoring getMonitoring() {
        try {
            URI path = new URI(properties.getBaseUrl() + "/monitoring?format=json&period=jour");
            InputStream file = jenkinsHttpClient.getFile(path);
            System.out.println();
            String theString = IOUtils.toString(file, Charset.forName("UTF-8"));

        } catch (URISyntaxException | IOException ex) {
            throw new JenkinsException("Jenkins baseUrl is invalid", ex);
        }

        return JenkinsMonitoring.builder()
                .lastUpdate("28/05 - 15:00")
                .version("2.46.3")
                .memory(80)
                .cpu(10)
                .fileDescriptor(74)
                .threadCount(130)
                .activeThreadCount(5)
                /*.freeDiskSpaceInTemp(FreeDiskSpaceInTemp.builder()
                    .label("3 Go")
                    .value(13)
                    .build())*/
                .build();


    }

    class Test extends BaseModel {

    }

    public JenkinsVersion getVersion() {
        assertServerIsRunning();
        return jenkins.getVersion();
    }

    public LastBuild getLastBuild(String jobName, String branch) {
        logger.info("Jenkins request: lastBuild with jobName={}, branch={}", jobName, branch);
        assertServerIsRunning();
        BuildWithDetails details = getBuildWithDetails(jobName, branch);
        String lastUpdate = Instant
                .ofEpochMilli(details.getTimestamp())
                .atZone(TimeZone.getDefault().toZoneId())
                .format(formatter);
        String author = details.getCulprits().isEmpty() ? "" :details.getCulprits().get(0).getFullName();
        return LastBuild.builder()
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
            throw new JenkinsException("Error during jenkins request", ex);
        }
    }

    private void assertServerIsRunning() {
        if (!jenkins.isRunning()) {
            throw new JenkinsException("jenkins is not running !");
        }
    }
}
