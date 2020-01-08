package com.thorpora.ezdashing.dashboard;

import com.fasterxml.jackson.databind.JsonNode;
import com.thorpora.ezdashing.dashboard.model.Dashboard;
import com.thorpora.ezdashing.utils.json.JsonUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.File;

@Slf4j
@AllArgsConstructor
public class DashboardFileRepository implements DashboardRepository {

    private File file;

    public Dashboard load() {
        return new Dashboard(JsonUtils.readValue(file, JsonNode.class));
    }

    public void save(Dashboard dashboard) {
        JsonUtils.writeValue(file, dashboard.getRootNode());
    }

}
