package com.thorpora.ezdashing.dashboard.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.StreamSupport.stream;

public class Widget {

  private JsonNode node;

  public Widget(JsonNode node) {
    this.node = node;
  }

  public String id() {
    return node.get("id").asText();
  }

  public String title() {
    return node.get("title").asText();
  }

  public JsonNode get(String field) {
    return node.get(field);
  }

  public List<Integer> getAsIntList(String field) {
    ArrayNode fieldNode = (ArrayNode)node.get(field);
    return stream(fieldNode.spliterator(), false)
            .map(JsonNode::intValue)
            .collect(Collectors.toList());
  }

}
