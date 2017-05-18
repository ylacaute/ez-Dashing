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

import org.sonar.wsclient.Sonar;
import org.sonar.wsclient.component.Component;
import org.sonar.wsclient.services.Measure;
import org.sonar.wsclient.services.Resource;
import org.sonar.wsclient.services.ResourceQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sonar")
public class SonarController {

    private SonarProperties properties;
    private Sonar server;

    @Autowired
    public SonarController(SonarProperties properties, Sonar server) {
        this.properties = properties;
        this.server = server;
    }

    // Nothing works with fucking nemo sonar... will see after with a real sonar server !

    // All possible metrics
    // https://sonarqube.com/api/metrics/search

    @GetMapping("/coverage")
    public Measure getCodeCoverage() {
/*
        ResourceQuery query = ResourceQuery.createForMetrics("org.apache.jackrabbit:Abixen Platform", "coverage", "lines", "violations");
        System.out.println(query.getUrl());
        Resource res = server.find(query);
        System.out.println(res);
        System.out.println(res.getMeasure("coverage"));
*/

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
        return null;
    }

}
