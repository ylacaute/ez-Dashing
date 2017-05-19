package com.thorpora.ezdashing.sonar;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class SonarSummary {

    private String projectId;
    private String projectKey;
    private String projectVersion;
    private String lastUpdate;
    private SonarMetric metrics;

}

@Builder
@Getter
@Setter
class SonarMetric {

    private int lines;
    private String coverage;
    private int violations;

}
