package com.thorpora.ezdashing.dashboard.model;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.thorpora.ezdashing.exception.InvalidServerConfigurationException;
import com.thorpora.ezdashing.utils.json.JsonUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.thorpora.ezdashing.utils.assertutils.FailFast.requireTrue;
import static com.thorpora.ezdashing.utils.json.JsonUtils.readValue;
import static com.thorpora.ezdashing.utils.json.JsonUtils.toJson;
import static java.util.stream.StreamSupport.stream;
import static lombok.AccessLevel.PRIVATE;

/**
 * The dashboard is mutable
 */
@Slf4j
@Data
@FieldDefaults(level = PRIVATE)
@AllArgsConstructor
public class Dashboard {

  JsonNode rootNode;

  public String asJson() {
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

  public Optional<DataSource> getDataSourceByQueryId(String queryId) {
    for (DataSource ds : getDataSources()) {
      if (ds.getQueries().stream().anyMatch(q -> queryId.equals(q.getId()))) {
        return Optional.of(ds);
      }
    }
    return Optional.empty();
  }

  public void updateWidget(String widgetId, Map<String, Object> fields) {
    JsonNode widgets = rootNode.get("widgets");
    requireTrue(widgets.isArray(), "Configuration error, widgets should be an array");

    for (final JsonNode widget : widgets) {
      if (widget.has("id") && widgetId.equals(widget.get("id").asText())) {
        log.info("Updating widgetId={} with fields={}", widgetId, fields);
        JsonUtils.patchNode((ObjectNode)widget, fields);
        return;
      }
    }
    throw new InvalidServerConfigurationException(String
            .format("Unable to update widgetId=%s because not found in configuration. " +
                    "In order to edit a widget, you must explicitly set an unique id in " +
                    "the dashboard.json configuration file.", widgetId));
  }

  public void updateGridLayout(Map<String, Object> fields) {
    log.info("Updating grid layout");
    ObjectNode grid = (ObjectNode)rootNode.get("grid");
    JsonNode layoutNode = new ObjectMapper().valueToTree(fields);
    grid.set("layouts", layoutNode);
  }
}
