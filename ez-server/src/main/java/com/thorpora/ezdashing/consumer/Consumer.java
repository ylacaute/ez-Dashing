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

import com.thorpora.ezdashing.dashboard.model.Credentials;
import com.thorpora.ezdashing.dashboard.model.DashboardConfiguration;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import feign.Feign;
import feign.Logger;
import feign.auth.BasicAuthRequestInterceptor;
import feign.slf4j.Slf4jLogger;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

import static org.apache.commons.lang3.StringUtils.isEmpty;

@Slf4j
public class Consumer {

    private APIConsumer apiConsumer;
    private DataSource dataSource;
    private DashboardConfiguration dashboardProperties;

    public Consumer(DashboardConfiguration dashboardProperties, DataSource dataSource) {
        this.dashboardProperties = dashboardProperties;
        this.dataSource = dataSource;
        Credentials cred = dataSource.getCredentials();
        Feign.Builder builder = Feign.builder();
        if (cred != null && !isEmpty(cred.getUserName()) && !isEmpty(cred.getPassword())) {
            builder.requestInterceptor(new BasicAuthRequestInterceptor(
                    cred.getUserName(),
                    cred.getPassword()));
        }
        this.apiConsumer = builder
                .retryer(new FeignRetryer())
                .logger(new Slf4jLogger(Consumer.class))
                .logLevel(Logger.Level.NONE)
                .target(APIConsumer.class, dataSource.getBaseUrl());
    }

    public String doQuery(String queryId, Map<String, String> params) {
        String fullQuery = dataSource.getQueries().stream()
                .filter(q -> queryId.equals(q.getId()))
                .findFirst()
                .get()
                .getPath();

        Map<String, String> variables = new HashMap<>();
        variables.putAll(dashboardProperties.getEnv());
        variables.putAll(params);
        fullQuery = replaceVariables(fullQuery, variables);
        String[] pathAndQueryParams = fullQuery.split("\\?");
        String path = pathAndQueryParams[0];
        Map<String, String> paramsMap = getQueryParamsAsMap(pathAndQueryParams[1]);
        return apiConsumer.query(path, paramsMap);
    }

    private String replaceVariables(String fullQuery, Map<String, String> params) {
        for (String paramKey : params.keySet()) {
            fullQuery = fullQuery.replace("${" + paramKey + "}", params.get(paramKey));
        }
        return fullQuery;
    }

    private Map<String, String> getQueryParamsAsMap(String queryParams) {
        String[] queryParamsSplited = queryParams.split("&");
        Map<String, String> paramsMap = new HashMap<>();
        for (String queryParam : queryParamsSplited) {
            int equalIdx = queryParam.indexOf("=");
            String querryParamName = queryParam.substring(0, equalIdx);
            String querryParamValue = queryParam.substring(equalIdx + 1, queryParam.length());
            paramsMap.put(querryParamName, querryParamValue);
        }
        return paramsMap;
    }

}
