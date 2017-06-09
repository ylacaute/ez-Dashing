package com.thorpora.ezdashing.sonar.dto;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class SonarSummary {

    private String projectId;
    private String projectKey;
    private String projectVersion;
    private String lastUpdate;
    private SonarMetric metrics;

}


