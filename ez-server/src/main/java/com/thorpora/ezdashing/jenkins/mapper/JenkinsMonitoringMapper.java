/**
 * Created by Yannick Lacaute on 09/06/17.
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
package com.thorpora.ezdashing.jenkins.mapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.thorpora.ezdashing.jenkins.JenkinsConfig;
import com.thorpora.ezdashing.jenkins.dto.JenkinsMonitoring;

import java.time.LocalDateTime;

public class JenkinsMonitoringMapper {

    public static JenkinsMonitoring map(JsonNode root) {
        JsonNode mem = root.findPath("memoryInformations");
        int usedMemory = mem.get("usedMemory").asInt();
        int maxMemory = mem.get("maxMemory").asInt();
        int usedFD = root.findValue("unixOpenFileDescriptorCount").asInt();
        int maxFD = root.findValue("unixMaxFileDescriptorCount").asInt();

        return JenkinsMonitoring.builder()
            .version(root.findPath("contextDisplayName").asText().replace("Jenkins ", ""))
            .lastUpdate(LocalDateTime.now().format(JenkinsConfig.DATE_FORMATTER))
            .memoryUsage((int) (usedMemory * 100.0f / maxMemory))
            .fileDescriptorUsage((int) (usedFD * 100.0f / maxFD))
            .cpuUsage(root.findValue("systemCpuLoad").asInt())
            .activeThreadCount(root.findValue("activeThreadCount").asInt())
            .freeDiskSpaceInTemp((int) (root.findValue("freeDiskSpaceInTemp").asLong() / 1024 / 1024))
            .build();
    }

}
