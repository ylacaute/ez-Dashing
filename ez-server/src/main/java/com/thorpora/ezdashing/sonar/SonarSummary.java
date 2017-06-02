package com.thorpora.ezdashing.sonar;

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

@Builder
@Data
class SonarMetric {

    private int lines;
    private String coverage;
    private int violations;

}
