package com.thorpora.ezdashing.jenkins.monitoring;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JenkinsMonitoring {
    private String lastUpdate;
    private String version;
    private int memory;
    private int cpu;
    private int fileDescriptor;
    private int threadCount;
    private int activeThreadCount;
    private FreeDiskSpaceInTemp freeDiskSpaceInTemp;
}

@Builder
@Data
class FreeDiskSpaceInTemp {
    private String label;
    private int value;
}
