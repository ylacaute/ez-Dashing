/**
 * Created by Yannick Lacaute on 17/06/17.
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
package com.thorpora.ezdashing.consumer;


import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import com.thorpora.ezdashing.dashboard.model.DataSourceQuery;
import com.thorpora.ezdashing.exception.ConsumerException;

import java.util.HashMap;
import java.util.Optional;

public class ConsumerRegistry {

    private HashMap<String, Consumer> consumers = new HashMap<>();
    private DashboardConfiguration dashboardProperties;

    public ConsumerRegistry(DashboardConfiguration dashboardProperties) {
        this.dashboardProperties = dashboardProperties;
    }

    public Consumer getConsumer(String queryId) {
        Consumer consumer = consumers.get(queryId);
        if (consumer == null) {
            consumer = register(queryId);
        }
        return consumer;
    }

    /**
     * We register the same consumer for all queries of a DataSource
     */
    public Consumer register(String queryId) {
        Optional<DataSource> dataSource = dashboardProperties.getDataSource(queryId);
        if (!dataSource.isPresent()) {
            throw new ConsumerException("consumer " + queryId + " doesn't exist in dashboard.json");
        }
        DataSource ds = dataSource.get();
        Consumer consumer = new Consumer(dashboardProperties, ds);

        for (DataSourceQuery query : ds.getQueries()) {
            consumers.put(query.getId(), consumer);
        }
        return consumer;
    }


}
