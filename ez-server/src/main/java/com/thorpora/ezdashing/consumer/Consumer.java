package com.thorpora.ezdashing.consumer;

import com.thorpora.ezdashing.dashboard.model.DataSource;
import com.thorpora.ezdashing.dashboard.model.DataSourceQuery;
import com.thorpora.ezdashing.exception.QueryConfigNotFound;
import com.thorpora.ezdashing.utils.feign.GenericFeignClient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

import static java.util.Objects.requireNonNull;

@Slf4j
@Getter
@AllArgsConstructor
public class Consumer {

    private GenericFeignClient httpClient;
    private DataSource dataSource;
    private Map<String, String> environment;

    /**
     * Execute a queryId with the given params.
     * The query must exist in the dataSource.
     */
    public String doQuery(String queryId, Map<String, String> params) {
        requireNonNull(dataSource.getHeaders(), "headers can't be null");
        requireNonNull(queryId, "QueryId can't be null");
        requireNonNull(params, "params can't be null");

        DataSourceQuery query = getQuery(queryId);
        String queryPath = replaceVariables(query.getPath(), params);

        String[] pathAndQueryParams = queryPath.split("\\?", 2);
        String path = pathAndQueryParams[0].replaceFirst("^/", "");
        Map<String, String> paramsMap;

        if (pathAndQueryParams.length == 1) {
            log.trace("No query params found");
            paramsMap = new HashMap<>();
        } else {
            log.trace("Query params found, extracting them");
            paramsMap = getQueryParamsAsMap(pathAndQueryParams[1]);
        }
        return httpClient.query(dataSource.getHeaders(), path, paramsMap);
    }

    private DataSourceQuery getQuery(String queryId) {
        return dataSource.getQueries()
                .stream()
                .filter(q -> queryId.equals(q.getId()))
                .findFirst()
                .orElseThrow(() -> new QueryConfigNotFound(queryId));
    }

    private String replaceVariables(String fullQuery, Map<String, String> params) {
        Map<String, String> variables = new HashMap<>();
        variables.putAll(environment);
        variables.putAll(params);

        for (String paramKey : variables.keySet()) {
            fullQuery = fullQuery.replace("${" + paramKey + "}", variables.get(paramKey));
        }
        return fullQuery;
    }

    private Map<String, String> getQueryParamsAsMap(String queryParams) {
        String[] queryParamsArray = queryParams.split("&", 1);
        Map<String, String> paramsMap = new HashMap<>();

        for (String qp : queryParamsArray) {
            String[] nameAndValue = qp.split("=", 2);
            paramsMap.put(nameAndValue[0], nameAndValue[1]);
        }
        return paramsMap;
    }

}
