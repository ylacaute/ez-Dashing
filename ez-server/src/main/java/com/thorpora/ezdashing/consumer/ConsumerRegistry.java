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


import com.thorpora.ezdashing.consumer.dto.AuthenticationDTO;

import java.util.HashMap;

public class ConsumerRegistry {

    private HashMap<String, Consumer> consumers = new HashMap<>();

    public Consumer getConsumer(String consumerName) {
        return consumers.get(consumerName);
    }

    public Consumer register(String consumerName, AuthenticationDTO authenticationDTO) {
        Consumer consumer = Consumer.builder()
                .name(consumerName)
                .baseUrl(authenticationDTO.getBaseUrl())
                .userName(authenticationDTO.getUserName())
                .password(authenticationDTO.getPassword())
                .build();
        consumer.initialize();
        consumers.put(consumer.getName(), consumer);
        return consumer;
    }

}
