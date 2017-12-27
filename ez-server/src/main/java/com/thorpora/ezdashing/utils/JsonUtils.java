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
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Map;
import java.util.stream.IntStream;

import static com.thorpora.ezdashing.utils.FieldType.*;
import static com.thorpora.ezdashing.utils.PatchOperation.INSERT_OR_REPLACE;
import static java.util.Arrays.stream;

public class JsonUtils {

    private static ObjectMapper defaultMapper = new ObjectMapper();

    public static void setDefaultMapper(ObjectMapper mapper) {
        JsonUtils.defaultMapper = mapper;
    }

    public static void patchNode(ObjectNode nodeToUpdate, Map<String, Object> fieldsToUpdate) {
        patchNode(INSERT_OR_REPLACE, nodeToUpdate, fieldsToUpdate);
    }

    public static void patchNode(
            PatchOperation pathOperation,
            ObjectNode nodeToUpdate,
            Map<String, Object> fieldsToUpdate) {
        fieldsToUpdate.keySet().forEach(fieldName -> patchNode(
                pathOperation,
                nodeToUpdate,
                fieldName,
                fieldsToUpdate.get(fieldName)));
    }

    public static void patchNode(PatchOperation op, ObjectNode nodeToUpdate, String fieldName, Object fieldValue)  {
        FieldType fieldType = getFieldType(fieldValue);
        JsonNode fieldToUpdate = nodeToUpdate.get(fieldName);

        if (fieldToUpdate != null && fieldToUpdate.isArray()) {
            patchArrayNode(op, nodeToUpdate, fieldName, fieldValue);
        } else {
            if (fieldType == ARRAY || fieldType == COLLECTION) {
                patchArrayNode(op, nodeToUpdate, fieldName, fieldValue);
            } else {
                nodeToUpdate.put(fieldName, fieldValue.toString());
            }
        }
    }

    private static void patchArrayNode(PatchOperation op, ObjectNode nodeToUpdate, String fieldName, Object fieldValue) {
        ArrayNode arrayNode = nodeToUpdate.withArray(fieldName);
        if (op == INSERT_OR_REPLACE) {
            arrayNode.removeAll();
        }
        addObjectToArrayNode(arrayNode, fieldValue);
    }

    public static ObjectNode valueToTree(Object object) {
        return defaultMapper.valueToTree(object);
    }

    public static <T> T treeToValue(TreeNode treeNode, Class<T> valueType) {
        try {
            return defaultMapper.treeToValue(treeNode, valueType);
        } catch (IOException ex) {
            throw new JsonException("Invalid treeNode/valueType", ex);
        }

    }

    public static String format(String inlineJson) {
        try {
            Object json = defaultMapper.readValue(inlineJson, Object.class);
            return defaultMapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
        } catch (IOException ex) {
            throw new JsonException("Invalid json", ex);
        }
    }

    public static void writeValue(File file, Object obj) {
        try {
            defaultMapper.writerWithDefaultPrettyPrinter().writeValue(file, obj);
        } catch (IOException ex) {
            throw new JsonException("Error during writeValue to file", ex);
        }
    }

    public static <T> T readValue(String filePath, Class<T> objClass) {
        try {
            return defaultMapper.readValue(new File(filePath), objClass);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from file", ex);
        }
    }

    public static <T> T readValue(File url, Class<T> objClass) {
        try {
            return defaultMapper.readValue(url, objClass);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from url", ex);
        }
    }

    public static <T> T readValue(InputStream is, Class<T> objClass) {
        try {
            return defaultMapper.readValue(is, objClass);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from inputStream", ex);
        }
    }

    public static <T> T readValue(JsonNode node, TypeReference typeRef) {
        try {
            return defaultMapper.readValue(defaultMapper.treeAsTokens(node), typeRef);
        } catch (IOException ex) {
            throw new JsonException("Error during readValue from jsonNode", ex);
        }
    }

    public static <T> T fromJson(String value, Class<T> objectClass) {
        try {
            return defaultMapper.readValue(value, objectClass);
        } catch (IOException ex) {
            throw new JsonException("Error during toJson from jsonNode", ex);
        }
    }

    public static String toJson(Object object) {
       return toJson(defaultMapper.valueToTree(object));
    }

    public static String toJson(JsonNode node) {
        try {
            return defaultMapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);
        } catch (JsonProcessingException ex) {
            throw new JsonException("Error during toJson from jsonNode", ex);
        }
    }

    public static JsonNode readTree(String content) {
        try {
            return defaultMapper.readTree(content);
        } catch (IOException ex) {
            throw new JsonException("Error during readTree from string", ex);
        }
    }

    private static void addObjectToArrayNode(ArrayNode arrayNode, Object object) {
        if (object instanceof Integer) {
            arrayNode.add((int) object);
        } else if (object instanceof Float) {
            arrayNode.add((float) object);
        } else if (object instanceof String) {
            arrayNode.add((String) object);
        } else if (object instanceof Double) {
            arrayNode.add((double) object);
        } else if (object instanceof Long) {
            arrayNode.add((long) object);
        } else if (object instanceof Boolean) {
            arrayNode.add((boolean) object);
        } else if (object instanceof BigDecimal) {
            arrayNode.add((BigDecimal) object);
        } else if (object instanceof JsonNode) {
            arrayNode.add((JsonNode) object);
        } else if (object instanceof byte[]) {
            arrayNode.add((byte[]) object);
        } else if (object instanceof int[]) {
            stream((int[]) object).forEach(value -> addObjectToArrayNode(arrayNode, value));
        } else if (object instanceof double[]) {
            stream((double[]) object).forEach(value -> addObjectToArrayNode(arrayNode, value));
        } else if (object instanceof long[]) {
            stream((long[]) object).forEach(value -> addObjectToArrayNode(arrayNode, value));
        } else if (object instanceof boolean[]) {
            boolean[] array = (boolean[]) object;
            IntStream.range(0, array.length).forEach(value -> addObjectToArrayNode(arrayNode, value));
        } else if (object instanceof Object[]) {
            stream((Object[]) object).forEach(value -> addObjectToArrayNode(arrayNode, value));
        } else if (object instanceof Collection) {
            ((Collection<?>) object).forEach(value -> addObjectToArrayNode(arrayNode, value));
        } else {
            throw new JsonException(String.format("Unable to patch, unsupported type: %s", object.getClass()));
        }
    }

    private static FieldType getFieldType(Object field) {
        if (field == null) {
            return SIMPLE;
        } else if (field instanceof Collection) {
            return COLLECTION;
        } else if (field.getClass().isArray()) {
            return ARRAY;
        } else {
            return SIMPLE;
        }
    }
}


enum PatchOperation {

    // Insert a new field or replace it if already exist
    INSERT_OR_REPLACE,

    // Insert a new field or, if the field exist and is an array, add given values to it
    INSERT_OR_ADD
}

enum FieldType {
    COLLECTION,
    ARRAY,
    SIMPLE
}

class JsonException extends RuntimeException {

    public JsonException(String message) {
        super(message);
    }

    public JsonException(String message, Throwable cause) {
        super(message, cause);
    }

}
