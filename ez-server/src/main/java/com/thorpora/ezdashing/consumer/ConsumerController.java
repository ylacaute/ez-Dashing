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
package com.thorpora.ezdashing.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/consumer")
public class ConsumerController {

    private ConsumerRegistry registry;

    @Autowired
    public ConsumerController(ConsumerRegistry registry) {
        this.registry = registry;
    }

    @GetMapping(value = "/{queryId}", produces = "application/json")
    public String getSummary(@PathVariable String queryId, @RequestParam Map<String, String> params) {
        log.debug("GET /api/consumer/{}", queryId);
        Consumer consumer = registry.getConsumer(queryId);
        String consumerResponse = consumer.doQuery(queryId, params);
        log.trace("Response of queryId '{}' : {}", queryId, consumerResponse);
        return consumerResponse;
    }

}
