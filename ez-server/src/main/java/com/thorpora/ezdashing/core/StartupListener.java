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
package com.thorpora.ezdashing.core;

import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

import java.util.List;

@Slf4j
public class StartupListener {

    @Autowired
    private Environment env;

    @Autowired
    private DashboardConfiguration dashboardConfig;

    @EventListener(ContextRefreshedEvent.class)
    public void devContextRefreshedEvent() {
        List<DataSource> ds = dashboardConfig.getDataSources();
        for (int i = 0; i < ds.size(); i++) {
            log.info("DataSource[{}]: baseUrl set to {}", i, ds.get(i).getBaseUrl());
        }
    }

}