/**
 * Created by Yannick Lacaute on 31/05/17.
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
package com.thorpora.ezdashing.jira;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thorpora.ezdashing.core.JsonUtils;
import com.thorpora.ezdashing.jira.dto.JiraResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JiraClient {

    private static final int MAX_RESULT = 200;

    private JiraAPI jiraAPI;
    private ObjectMapper mapper;

    @Autowired
    public JiraClient(
            ObjectMapper objectMapper,
            JiraAPI jiraAPI) {
        this.mapper = objectMapper;
        this.jiraAPI = jiraAPI;
    }

    public JiraResponse doQuery(String query) {
        return buildResponse(jiraAPI.query(query, MAX_RESULT));
    }

    public JiraResponse doFastQuery(String query) {
        return buildResponse(jiraAPI.queryWithFields(query, MAX_RESULT, "fields=key"));
    }

    private JiraResponse buildResponse(String rawResult) {
        JsonNode root = JsonUtils.readTree(mapper, rawResult);
        return JiraResponse.builder()
                .total(root.get("total").asInt())
                .response(rawResult)
                .build();
    }

}
