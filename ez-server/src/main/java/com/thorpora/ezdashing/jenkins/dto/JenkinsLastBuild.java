package com.thorpora.ezdashing.jenkins.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JenkinsLastBuild {

    /**
     * The job name, sample : bc-gas-sys_-_Analyse_reccurente
     */
    private String jobName;

    /**
     * The branch name, sample : master
     */
    private String branch;

    /**
     * Id of the build, sample : 917
     */
    private String id;

    /**
     * Date of the build, sample : 2017-05-17
     */
    private String lastUpdate;

    /**
     * Duration in seconds of the build (maybe not finished)
     */
    private long duration;

    /**
     * Estimated duration in seconds of the build
     */
    private long estimatedDuration;

    /**
     * Last author triggering the build
     */
    private String author;

    /**
     * Status of the build, see {@link com.offbytwo.jenkins.model.BuildResult} for possible values
     */
    private String state;

    /**
     * Build progression in percentage
     */
    private int progress;

}
