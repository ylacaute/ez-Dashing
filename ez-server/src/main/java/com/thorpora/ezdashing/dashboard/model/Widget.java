package com.thorpora.ezdashing.dashboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.StreamSupport.stream;
import static lombok.AccessLevel.PRIVATE;

@Value
@FieldDefaults(level = PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Widget {

  JsonNode node;

  public String id() {
    return node.get("id").asText();
  }

  public String title() {
    return node.get("title").asText();
  }

  public JsonNode getField(String field) {
    return node.get(field);
  }

  public List<Integer> getAsIntList(String field) {
    ArrayNode fieldNode = (ArrayNode)node.get(field);
    return stream(fieldNode.spliterator(), false)
            .map(JsonNode::intValue)
            .collect(Collectors.toList());
  }

}
