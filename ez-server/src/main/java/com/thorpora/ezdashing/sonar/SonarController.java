/**
 * Created by Yannick Lacaute on 17/05/17.
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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sonar.wsclient.Sonar;
import org.sonar.wsclient.services.Resource;
import org.sonar.wsclient.services.ResourceQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.TimeZone;

@RestController
@RequestMapping("/api/sonar")
public class SonarController {

    // All possible metrics
    // https://sonarqube.com/api/metrics/search

    // http://sonar.dev.edelia.net/api/navigation/component?componentKey=com.edelia.bilanconso.gas:bc-gas-sys:origin/master

    // http://sonar.dev.edelia.net/api/resources?resource=com.edelia.bilanconso.gas%3Abc-gas-sys%3Aorigin%2Fmaster&metrics=coverage,lines,violations,sqale_rating,overall_coverage,new_overall_coverage,coverage,new_coverage,it_coverage,new_it_coverage,tests%2Cduplicated_lines_density,duplicated_blocks,ncloc,new_major_violations&verbose=false&format=json
    private static final Logger logger = LoggerFactory.getLogger(SonarController.class);
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:MM");

    private static final String queryParams = "format=json&includetrends=true&";

    private SonarProperties properties;
    private Sonar server;

    @Autowired
    public SonarController(SonarProperties properties, Sonar server) {
        this.properties = properties;
        this.server = server;
    }

    // Nothing works with fucking nemo sonar... will see after with a real sonar server !



    //complexity  "Cyclomatic complexity"
    @GetMapping("/summary")
    public SonarSummary getCodeCoverage(@RequestParam String projectKey) {

        // TODO: LOG REQUEST WITH AOP
        logger.debug("GET /api/sonar/summary?projectKey={}", projectKey);

        //projectKey = "com.edelia.bilanconso.gas:bc-gas-sys:origin/master";
        ResourceQuery query = new ResourceQuery(projectKey);
        query.setIncludeTrends(true);
        Resource resource = server.find(query);

        ResourceQuery forMetrics = ResourceQuery.createForMetrics(projectKey,
                "lines", "coverage", "violations");
        /*
                "coverage", "new_coverage", "it_coverage", "new_it_coverage", "tests,duplicated_lines_density",
                "duplicated_blocks", "ncloc", "new_major_violations");*/
        //forMetrics.setCharacteristics("createdAfter=" + resource.getPeriod1Date());
        //forMetrics.getModelClass();
        Resource r = server.find(forMetrics);
        String lastUpdate = r.getDate() == null ? "" : r.getDate()
                .toInstant()
                .atZone(TimeZone.getDefault().toZoneId())
                .format(formatter);

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


        //createdAfter=
        // "tests", "test_errors", "test_failures", "skipped_tests", "test_execution_time", "test_success_density"
        // "blocker_violations"

        /*
            violations
            blocker_violations
            critical_violations
            major_violations
            minor_violations
            info_violations
         */
        //com.abixen%3Aabixen-platform
        //com.abixen%3Aabixen-platform
        //Resource struts = server.find(ResourceQuery.createForMetrics("com.abixen:abixen-platform", "coverage", "lines", "violations"));
        //Component c = Component

        //https://sonarqube.com/api/properties
        //https://sonarqube.com/api/resources?resource=qualinsight.badges.activation.measure&metrics=coverage&format=json
        //https://sonarqube.com/api/measures/components?componentKey=qualinsight.badges.activation.measure&metricKeys=coverage
        /*
        String resourceKeyOrId = "mysql:client/auth_utils.h";
        Resource resource = server.find(new ResourceQuery(resourceKeyOrId)
                .setMetrics("coverage")
                .setIncludeTrends(true));

        //Resource struts = server.find(ResourceQuery.createForMetrics(resourceKeyOrId, "coverage", "lines", "violations"));
        Measure m = resource.getMeasure("coverage");
        String nb = m.getFormattedValue();

        return m;*/

}
