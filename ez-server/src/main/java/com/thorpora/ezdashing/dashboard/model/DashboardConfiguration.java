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
package com.thorpora.ezdashing.dashboard.model;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.thorpora.ezdashing.exception.InvalidServerConfigurationException;
import com.thorpora.ezdashing.utils.JsonUtils;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

import static com.thorpora.ezdashing.utils.FailFast.checkIsTrue;
import static com.thorpora.ezdashing.utils.JsonUtils.*;
import static java.util.stream.StreamSupport.stream;
import static lombok.AccessLevel.PRIVATE;

@Slf4j
@FieldDefaults(level = PRIVATE)
@Getter
@Setter
public class DashboardConfiguration {

  File file;
  JsonNode rootNode;

  public DashboardConfiguration(File file) {
    this.rootNode = readValue(file, JsonNode.class);
    this.file = file;
  }

  public void save() {
    writeValue(file, rootNode);
  }

  public void save(File file) {
    writeValue(file, rootNode);
  }

  public String getAsString() {
    return toJson(rootNode);
  }

  public List<DataSource> getDataSources() {
    return readValue(rootNode.get("dataSources"), new TypeReference<List<DataSource>>() {});
  }

  public Map<String, String> getEnv() {
    return readValue(rootNode.get("env"), new TypeReference<Map<String, String>>() {});
  }

  public List<Widget> getWidgets() {
    ArrayNode widgets = (ArrayNode)rootNode.get("widgets");
    return stream(widgets.spliterator(), false)
            .map(Widget::new)
            .collect(Collectors.toList());
  }

  public Optional<DataSource> getDataSource(String queryId) {
    for (DataSource ds : getDataSources()) {
      if (ds.getQueries().stream().anyMatch(q -> queryId.equals(q.getId()))) {
        return Optional.of(ds);
      }
    }
    return Optional.empty();
  }

  public void updateWidget(String widgetId, Map<String, Object> fields) {
    JsonNode widgets = rootNode.get("widgets");
    checkIsTrue(widgets.isArray(), "Configuration error, widgets should be an array");

    for (final JsonNode widget : widgets) {
      if (widget.has("id") && widgetId.equals(widget.get("id").asText())) {
        log.info("Updating widgetId={} with fields={}", widgetId, fields);
        JsonUtils.patchNode((ObjectNode)widget, fields);
        return;
      }
    }
    throw new InvalidServerConfigurationException(String
            .format("Unable to update widgetId=%s because not found in configuration. " +
                    "In order to edit a widget, you must explicitly set an unique id in the dashboard.json configuration file.", widgetId));
  }

  public void updateGridLayout(Map<String, Object> fields) {
    log.info("Updating grid layout");
    ObjectNode grid = (ObjectNode)rootNode.get("grid");
    JsonNode layoutNode = new ObjectMapper().valueToTree(fields);
    grid.set("layouts", layoutNode);
  }
}
