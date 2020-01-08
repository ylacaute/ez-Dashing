package com.thorpora.ezdashing;

import com.thorpora.ezdashing.dashboard.model.Dashboard;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

import java.util.List;

@Slf4j
public class AppStartupListener {

    @Autowired
    private Environment env;

    @Autowired
    private Dashboard dashboardConfig;

    @EventListener(ContextRefreshedEvent.class)
    public void devContextRefreshedEvent() {
        List<DataSource> ds = dashboardConfig.getDataSources();
        for (int i = 0; i < ds.size(); i++) {
            log.info("DataSource[{}]: baseUrl set to {}", i, ds.get(i).getBaseUrl());
        }
    }

}