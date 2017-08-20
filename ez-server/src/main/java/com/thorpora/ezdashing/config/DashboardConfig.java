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
package com.thorpora.ezdashing.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thorpora.ezdashing.dashboard.DashboardLoader;
import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DashboardConfig {

    @Bean
    public DashboardLoader dashboardLoader() {
        return new DashboardLoader();
    }

    @Bean
    public DashboardConfiguration dashboardConfiguration(
            DashboardLoader dashboardLoader,
            ObjectMapper objectMapper) {
        return dashboardLoader.load(objectMapper);
    }

}
