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
package com.thorpora.ezdashing.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public class JsonUtils {

    private static ObjectMapper mapper = new ObjectMapper();

    public static void setMapper(ObjectMapper mapper) {
        JsonUtils.mapper = mapper;
    }

    public static String format(String inlineJson) {
        try {
            Object json = mapper.readValue(inlineJson, Object.class);
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
        } catch (IOException ex) {
            throw new JsonException("Invalid json", ex);
        }
    }

    public static void writeValue(File file, Object obj) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, obj);
        } catch (IOException ex) {
            throw new JsonException("Error during writeValue to file", ex);
        }
    }

    public static <T> T readValue(String filePath, Class<T> objClass) {
        try {
            return mapper.readValue(new File(filePath), objClass);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from file", ex);
        }
    }

    public static <T> T readValue(File url, Class<T> objClass) {
        try {
            return mapper.readValue(url, objClass);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from url", ex);
        }
    }

    public static <T> T readValue(InputStream is, Class<T> objClass) {
        try {
            return mapper.readValue(is, objClass);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from inputStream", ex);
        }
    }

    public static <T> T readValue(JsonNode node, TypeReference typeRef) {
        try {
            return mapper.readValue(mapper.treeAsTokens(node), typeRef);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from jsonNode", ex);
        }
    }

    public static String writeValueAsString(JsonNode node) {
        try {
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);
        } catch (JsonProcessingException ex) {
            throw new JsonException("Error during writeValueAsString from jsonNode", ex);
        }
    }

    public static JsonNode readTree(String content) {
        try {
            return mapper.readTree(content);
        } catch (IOException ex) {
            throw new JsonException("Error during readTree from string", ex);
        }
    }

}

class JsonException extends RuntimeException {

    public JsonException(String message) {
        super(message);
    }

    public JsonException(String message, Throwable cause) {
        super(message, cause);
    }

}
