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

import com.thorpora.ezdashing.jira.JiraClient;
import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.slf4j.Slf4jLogger;
import lombok.Builder;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

@Data
@Builder
public class Consumer {

    private static final Logger logger = LoggerFactory.getLogger(Consumer.class);

    private APIConsumer apiConsumer;

    private String name;

    private String baseUrl;

    private String userName;

    private String password;

    public void initialize() {
        logger.debug("Initialize APIConsumer '{}'", name);
        this.apiConsumer = Feign.builder()
                .requestInterceptor(new BasicAuthRequestInterceptor(userName, password))
                .logger(new Slf4jLogger(JiraClient.class))
                .logLevel(feign.Logger.Level.BASIC)
                .target(APIConsumer.class, baseUrl);
    }

    // TODO : find a better way to make a generic call to Feign from an encoded query
    public String query(String encodedQuery) {
        String query = null;
        try {
            query = URLDecoder.decode(encodedQuery, "UTF-8");
        } catch (UnsupportedEncodingException ex) {
            throw new ConsumerException(String
                    .format("Consumer '{]' failed to decode query '{}'", name, encodedQuery), ex);
        }
        String[] pathAndQueryParams = query.split("\\?");
        String path = pathAndQueryParams[0];
        String queryParams = pathAndQueryParams[1];
        String[] queryParamsSplited = queryParams.split("&");
        Map<String, String> paramsMap = new HashMap<>();
        for (String queryParam : queryParamsSplited) {
            int equalIdx = queryParam.indexOf("=");
            String querryparamName = queryParam.substring(0, equalIdx);
            String querryparamValue = queryParam.substring(equalIdx + 1, queryParam.length());
            paramsMap.put(querryparamName, querryparamValue);
        }
        logger.debug("Consumer query: path={}, paramsMap={}", path, paramsMap);
        return apiConsumer.query(path, paramsMap);
    }

}
