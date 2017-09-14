/**
 * Created by Yannick Lacaute on 06/06/17.
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
package com.thorpora.ezdashing.dashboard;

import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.thorpora.ezdashing.utils.JsonUtils.writeValueAsString;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RequestMapping(value = "/api/dashboard")
@RestController
public class DashboardController {

    private DashboardConfiguration dashboardProperties;

    public DashboardController(DashboardConfiguration dashboardProperties) {
        this.dashboardProperties = dashboardProperties;
    }

    @GetMapping(value = "/config", produces = APPLICATION_JSON_VALUE)
    public String getDashboardConfig() {
        log.trace("GET /api/dashboard/config");
        return dashboardProperties.getAsString();
    }

    /**
     * Currently, only String fields of widgets can be saved
     */
    @PatchMapping(value = "/config/widgets/{widgetId}", consumes = APPLICATION_JSON_VALUE)
    public void patchWidget(
            @PathVariable String widgetId,
            @RequestBody Map<String, String> fields) {
        log.trace("PATCH /config/widgets/{} with body={}", widgetId, fields);
        dashboardProperties.updateWidget(widgetId, fields);
        dashboardProperties.save();
    }

    @PatchMapping(value = "/config/grid/layout", consumes = APPLICATION_JSON_VALUE)
    public void patchGridLayout(@RequestBody Map<String, Object> fields) {
        log.trace("PATCH /config/grid/layout with body={}", fields);
        dashboardProperties.updateGridLayout(fields);
        dashboardProperties.save();
    }

}
