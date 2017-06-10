/**
 * Created by Yannick Lacaute on 10/06/17.
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
package com.thorpora.ezdashing.core;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class JsonUtils {

    public static String format(String inlineJson) {
        ObjectMapper mapper = new ObjectMapper();
        Object json = null;
        try {
            json = mapper.readValue(inlineJson, Object.class);
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
        } catch (IOException ex) {
            throw new RuntimeException("Invalid json", ex);
        }
    }

    public static JsonNode readTree(ObjectMapper mapper, String obj) {
        try {
            return mapper.readTree(obj);
        } catch (IOException ex) {
            throw new JsonException("Error during readTree", ex);
        }
    }

}
