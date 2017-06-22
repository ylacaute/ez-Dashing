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

import com.thorpora.ezdashing.consumer.dto.AuthenticationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/consumer")
public class ConsumerController {

    private static final Logger logger = LoggerFactory.getLogger(ConsumerController.class);

    private ConsumerRegistry registry;

    @Autowired
    public ConsumerController(ConsumerRegistry registry) {
        this.registry = registry;
    }

    @PostMapping("/authentication/{consumerName}")
    public void authentication(
            @PathVariable String consumerName,
            @RequestBody AuthenticationDTO authenticationDTO) {
        logger.debug("GET /authentication/{}?authenticationDTO={}", consumerName, authenticationDTO);
        registry.register(consumerName, authenticationDTO);
    }

    @GetMapping("/{consumerName}")
    public String getSummary(
            @PathVariable String consumerName,
            @RequestParam("query") String encodedQuery,
            AuthenticationDTO authenticationDTO) {
        logger.debug("GET /api/consumer/{}?authenticationDTO={},query={}", consumerName, authenticationDTO, encodedQuery);
        Consumer consumer = registry.getConsumer(consumerName);
        if (consumer == null) {
            consumer = registry.register(consumerName, authenticationDTO);
        }
        String consumerResponse = consumer.query(encodedQuery);
        logger.debug("Response of consumer '{}' : {}", consumerName, consumerResponse);
        return consumerResponse;
    }

}
