package com.thorpora.ezdashing.dashboard;

import com.thorpora.ezdashing.dashboard.model.Dashboard;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RequestMapping(value = "/api/dashboard")
@AllArgsConstructor
@RestController
public class DashboardController {

    private Dashboard dashboard;
    private DashboardFileRepository dashboardFileRepository;

    /**
     * Retrieve dashboard as JSON
     * FIXME: Why the hell we need to explicit the produces as we are in a RestController ? (default behaviour)
     */
    @GetMapping(
            value = "/config",
            produces = APPLICATION_JSON_VALUE)
    public String getDashboardConfig() {
        log.trace("GET /api/dashboard/config");
        return dashboard.asJson();
    }

    /**
     * Patch the given widgetId.
     * Currently, only String fields of widgets can be saved
     */
    @PatchMapping(
            value = "/config/widgets/{widgetId}",
            consumes = APPLICATION_JSON_VALUE)
    public void patchWidget(
            @PathVariable String widgetId,
            @RequestBody Map<String, Object> fields) {
        log.trace("PATCH /config/widgets/{} with body={}", widgetId, fields);
        dashboard.updateWidget(widgetId, fields);
        dashboardFileRepository.save(dashboard);
    }

    @PatchMapping(
            value = "/config/grid/layout",
            consumes = APPLICATION_JSON_VALUE)
    public void patchGridLayout(@RequestBody Map<String, Object> fields) {
        log.trace("PATCH /config/grid/layout with body={}", fields);
        dashboard.updateGridLayout(fields);
        dashboardFileRepository.save(dashboard);
    }

}
