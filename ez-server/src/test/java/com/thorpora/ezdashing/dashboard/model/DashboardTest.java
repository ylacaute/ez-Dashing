package com.thorpora.ezdashing.dashboard.model;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static com.thorpora.ezdashing.utils.json.JsonUtils.readValue;
import static java.lang.String.format;
import static java.util.Objects.requireNonNull;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.entry;

class DashboardTest {

  private static final ClassLoader classLoader = DashboardTest.class.getClassLoader();
  private static final String DASHBOARD_JSON = "dashboard.json";
  private static final String INVALID_DASHBOARD_JSON = "invalid_dashboard.json";
  private static File file;
  private static File invalidFile;
  private static File savedFile;

  /**
   * We use a temp save file in order to not alter the dashboard.json file for other tests
   */
  @BeforeAll
  static void beforeAll() throws IOException {
    file = getDashboardFile(DASHBOARD_JSON);
    invalidFile = getDashboardFile(INVALID_DASHBOARD_JSON);
    savedFile = File.createTempFile(DASHBOARD_JSON, ".tmp");
    savedFile.deleteOnExit();
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Construct a Dashboard configuration from a valid json file")
  void shouldLoadDashboardFromFile() {
    // GIVEN
    JsonNode n = readValue(file, JsonNode.class);

    // WHEN
    Dashboard cfg = new Dashboard(n);

    // THEN
    assertThat(cfg.getDataSources()).hasSize(3);
    assertThat(cfg.getDataSourceByQueryId("jira-sprint-active")).isNotNull();
    assertThat(cfg.getWidgets()).hasSize(18);
    assertThat(cfg.getEnv()).contains(entry("jiraBoardId", "124"));
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Should manage to load a Dashboard even if invalid configuration file")
  void shouldFailToLoadDashboardBecauseInvalidConfigFile() {
    // GIVEN
    JsonNode n = readValue(invalidFile, JsonNode.class);

    // WHEN
    Dashboard cfg = new Dashboard(n);

    // THEN
    // no exception
  }


  private static File getDashboardFile(String dashboardFile) {
    String errorMsg = format("No file %s found in classpath for test", dashboardFile);
    URL validFileUrl = requireNonNull(classLoader.getResource(dashboardFile), errorMsg);
    return new File(validFileUrl.getFile());
  }

//  @Test
//  @Tag(ADVANCED_UNIT_TEST)
//  @DisplayName("Load config, modify a widget title, save config, reload with modifications")
//  void verifyReadWriteConfiguration() throws IOException {
//    // GIVEN
//    String widgetId = "sampleUniqueId";
//    String newWidgetTitle = "new Title !!!";
//    Map<String, Object> fields = new HashMap<>();
//    fields.put("title", newWidgetTitle);
//
//    // WHEN
//    Dashboard cfg = new Dashboard(file);
//    assertThat(cfg.getWidgets()).hasSize(18);
//    cfg.updateWidget(widgetId, fields);
//    cfg.save(savedFile);
//
//    // THEN
//    Dashboard reloadedCfg = new Dashboard(savedFile);
//    assertThat(reloadedCfg.getWidgets()).hasSize(18);
//    Optional<Widget> updatedWidget = reloadedCfg.getWidgets()
//            .stream()
//            .filter(w -> widgetId.equals(w.id()))
//            .findFirst();
//    assertThat(updatedWidget).isPresent();
//    assertThat(updatedWidget.get().title()).isEqualTo(newWidgetTitle);
//  }
//
//  @Test
//  @Tag(ADVANCED_UNIT_TEST)
//  @DisplayName("Load config, modify a widget int array, save config, reload with modifications")
//  void verifyReadWriteConfiguration2() throws IOException {
//    // GIVEN
//    String widgetId = "velocityUniqueId";
//    int[] integerArray = {0, 1};
//    Map<String, Object> fields = new HashMap<>();
//    fields.put("velocity", integerArray);
//
//    // WHEN
//    Dashboard cfg = new Dashboard(file);
//    assertThat(cfg.getWidgets()).hasSize(18);
//    cfg.updateWidget(widgetId, fields);
//    cfg.save(savedFile);
//
//    // THEN
//    Dashboard reloadedCfg = new Dashboard(savedFile);
//    assertThat(reloadedCfg.getWidgets()).hasSize(18);
//    Optional<Widget> updatedWidget = reloadedCfg.getWidgets()
//            .stream()
//            .filter(w -> widgetId.equals(w.id()))
//            .findFirst();
//    assertThat(updatedWidget).isPresent();
//    assertThat(updatedWidget.get().getAsIntList("velocity"))
//            .containsExactly(0, 1);
//  }



}