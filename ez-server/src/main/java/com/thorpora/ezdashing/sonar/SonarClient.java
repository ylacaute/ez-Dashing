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
package com.thorpora.ezdashing.sonar;

import com.thorpora.ezdashing.sonar.dto.SonarMetric;
import com.thorpora.ezdashing.sonar.dto.SonarSummary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sonar.wsclient.Host;
import org.sonar.wsclient.Sonar;
import org.sonar.wsclient.connectors.HttpClient4Connector;
import org.sonar.wsclient.services.Resource;
import org.sonar.wsclient.services.ResourceQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

// All possible metrics
// http://sonar.dev.edelia.net/api/navigation/component?componentKey=com.edelia.bilanconso.gas:bc-gas-sys:origin/master
// http://sonar.dev.edelia.net/api/resources?resource=com.edelia.bilanconso.gas%3Abc-gas-sys%3Aorigin%2Fmaster&metrics=coverage,lines,violations,sqale_rating,overall_coverage,new_overall_coverage,coverage,new_coverage,it_coverage,new_it_coverage,tests%2Cduplicated_lines_density,duplicated_blocks,ncloc,new_major_violations&verbose=false&format=json

// TEST WITH FREE ONLINE SONAR
//https://sonarqube.com/api/metrics/search
//https://sonarqube.com/api/properties
//https://sonarqube.com/api/resources?resource=qualinsight.badges.activation.measure&metrics=coverage&format=json
//https://sonarqube.com/api/measures/components?componentKey=qualinsight.badges.activation.measure&metricKeys=coverage

@Service
public class SonarClient {

    private static final Logger logger = LoggerFactory.getLogger(SonarClient.class);

    private SonarProperties properties;

    @Autowired
    public SonarClient(SonarProperties properties) {
        this.properties = properties;
    }

    /**
     * Metrics to try :
     * "coverage", "new_coverage", "it_coverage", "new_it_coverage"
     * "tests,duplicated_lines_density"
     * "duplicated_blocks", "ncloc", "new_major_violations"
     *
     * TODO : find a way to request with query "createdAfter="
     */
    public SonarSummary getSonarSummary(String projectKey) {
        Sonar sonar = getServerSonar();
        logger.info("Sonar request: metrics lines, coverage, violations for projectKey={}", projectKey);
        //ResourceQuery query = new ResourceQuery(projectKey);
        //query.setIncludeTrends(true);
        //Resource resource = server.find(query);

        ResourceQuery forMetrics = ResourceQuery.createForMetrics(projectKey, "lines", "coverage", "violations");
        Resource r = sonar.find(forMetrics);
        String lastUpdate = r.getDate() == null ? "" : r.getDate()
                .toInstant()
                .atZone(TimeZone.getDefault().toZoneId())
                .format(SonarConfig.DATE_FORMATTER);

        SonarSummary summary = SonarSummary.builder()
                .projectId(r.getId().toString())
                .projectKey(r.getKey())
                .projectVersion(r.getVersion())
                .lastUpdate(lastUpdate)
                .metrics(SonarMetric.builder()
                        .lines(r.getMeasure("lines").getIntValue())
                        .coverage(r.getMeasure("coverage").getFormattedValue())
                        .violations(r.getMeasure("violations").getIntValue())
                        .build())
                .build();
        logger.debug("Sonar query : {}", forMetrics.getUrl());
        return summary;
    }

    private Sonar getServerSonar() {
        Host server = new Host(properties.getBaseUrl(), properties.getUserName(), properties.getPassword());
        Sonar sonar = new Sonar(new HttpClient4Connector(server));
        return sonar;
    }

}
