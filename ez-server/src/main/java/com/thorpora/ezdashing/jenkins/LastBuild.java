package com.thorpora.ezdashing.jenkins;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class LastBuild {

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
    private String date;

    /**
     * Indicate if the build is still running
     */
    private boolean isBuilding;

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
     * Result of the build, see {@link com.offbytwo.jenkins.model.BuildResult} for possible values
     */
    private String result;

}
