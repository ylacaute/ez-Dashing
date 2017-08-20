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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

import java.util.Arrays;
import java.util.List;

@Profile("production")
public class StartupListener {

    private final static Logger logger = LoggerFactory.getLogger(StartupListener.class);

    @Autowired
    private Environment env;

    @EventListener(ContextRefreshedEvent.class)
    public void devContextRefreshedEvent() {
        List<DataSource> ds = dashboardConfig.getDataSources();
        for (int i = 0; i < ds.size(); i++) {
            logger.info("DataSource[{}]: baseUrl set to {}", i, ds.get(i).getBaseUrl());
        }
    }

    @Autowired
    private DashboardConfiguration dashboardConfig;

    private boolean isProduction() {
        return Arrays.stream(env.getActiveProfiles()).anyMatch(p -> p.equals("prod"));
    }

}