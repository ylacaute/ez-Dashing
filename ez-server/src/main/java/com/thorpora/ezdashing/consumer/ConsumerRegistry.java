package com.thorpora.ezdashing.consumer;


import com.thorpora.ezdashing.dashboard.model.Dashboard;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import com.thorpora.ezdashing.dashboard.model.DataSourceQuery;
import com.thorpora.ezdashing.exception.QueryConfigNotFound;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
public class ConsumerRegistry {

    private ConsumerFactory consumerFactory;
    private HashMap<String, Consumer> consumers;
    private Dashboard dashboard;

    /**
     * Return the registered consumer for the given queryId.
     * If no consumer is registered for this query, register it on the fly on return it.
     * All queries of the of the same dataSource share the same consumer.
     */
    public Consumer getConsumer(String queryId) {
        Consumer consumer = consumers.get(queryId);
        if (consumer == null) {
            log.debug("Registering a new consumer for queryId={}", queryId);
            consumer = register(queryId);
        } else {
            log.debug("Consumer found for queryId={}", queryId);
        }
        return consumer;
    }

    /**
     * Create a new registered consumer for the given queryId.
     * All queries of the of the same dataSource share the same consumer.
     */
    public Consumer register(String queryId) {
        Optional<DataSource> dataSource = dashboard.getDataSourceByQueryId(queryId);
        if (!dataSource.isPresent()) {
            throw new QueryConfigNotFound("queryId " + queryId + " doesn't exist in dashboard.json");
        }
        DataSource ds = dataSource.get();
        Consumer consumer = consumerFactory.create(dashboard.getEnv(), ds);

        for (DataSourceQuery query : ds.getQueries()) {
            consumers.put(query.getId(), consumer);
        }
        return consumer;
    }


}
