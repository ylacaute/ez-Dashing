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

import com.thorpora.ezdashing.dashboard.model.DataSource;
import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.slf4j.Slf4jLogger;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class Consumer {

    private APIConsumer apiConsumer;
    private DataSource dataSource;

    public Consumer(DataSource dataSource) {
        this.dataSource = dataSource;
        this.apiConsumer = Feign.builder()
                .requestInterceptor(new BasicAuthRequestInterceptor(
                        dataSource.getCredentials().getUserName(),
                        dataSource.getCredentials().getPassword()))
                .logger(new Slf4jLogger(Consumer.class))
                .logLevel(feign.Logger.Level.BASIC)
                .target(APIConsumer.class, dataSource.getBaseUrl());
    }

    public String doQuery(String queryId) {
        String fullQuery = dataSource.getQueries().stream()
                .filter(q -> queryId.equals(q.getId()))
                .findFirst()
                .get()
                .getPath();
        String[] pathAndQueryParams = fullQuery.split("\\?");
        String path = pathAndQueryParams[0];
        Map<String, String> paramsMap = getQueryParamsAsMap(pathAndQueryParams[1]);
        return apiConsumer.query(path, paramsMap);
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
