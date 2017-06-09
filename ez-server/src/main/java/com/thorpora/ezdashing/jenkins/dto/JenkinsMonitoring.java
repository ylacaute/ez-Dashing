package com.thorpora.ezdashing.jenkins.dto;

import lombok.Builder;
import lombok.Data;

/**
 * Usage are in percentage, between 0 and 100.
 * Diskspace is in Mo
 */
@Builder
@Data
public class JenkinsMonitoring {
    private String lastUpdate;
    private String version;
    private int memoryUsage;
    private int cpuUsage;
    private int fileDescriptorUsage;
    private int activeThreadCount;
    private int freeDiskSpaceInTemp;
}
