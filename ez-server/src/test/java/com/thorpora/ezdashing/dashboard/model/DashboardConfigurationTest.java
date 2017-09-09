package com.thorpora.ezdashing.dashboard.model;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.entry;
import static org.assertj.core.api.Assertions.assertThat;

public class DashboardConfigurationTest {

  private static final ClassLoader classLoader = DashboardConfigurationTest.class.getClassLoader();
  private static File file;
  private static File savedFile;

  /**
   * We use a temp save file in order to not alter the dashboard.json file for other tests
   */
  @BeforeAll
  public static void beforeAll() throws IOException {
    file = new File(classLoader.getResource("dashboard.json").getFile());
    savedFile = File.createTempFile("dashboardSaved.json", ".tmp");
    savedFile.deleteOnExit();
  }

  @Test
  @DisplayName("Construct a Dashboard configuration from a valid json file")
  public void verifyValidJsonLoad() {
    // WHEN
    DashboardConfiguration cfg = new DashboardConfiguration(file);

    // THEN
    assertThat(cfg.getDataSources()).hasSize(3);
    assertThat(cfg.getDataSource("jira-sprint-active")).isNotNull();
    assertThat(cfg.getWidgets()).hasSize(17);
    assertThat(cfg.getEnv()).contains(entry("jiraBoardId", "124"));
  }

  @Test
  @DisplayName("Load config, modify widgets, save config, reload with modifications")
  public void verifyReadWriteConfiguration() throws IOException {
    // GIVEN
    String widgetId = "sampleUniqueId";
    String newWidgetTitle = "new Title !!!";
    Map<String, String> fields = new HashMap<>();
    fields.put("title", newWidgetTitle);

    // WHEN
    DashboardConfiguration cfg = new DashboardConfiguration(file);
    cfg.updateWidget(widgetId, fields);
    cfg.save(savedFile);

    // THEN
    DashboardConfiguration reloadedCfg = new DashboardConfiguration(savedFile);
    assertThat(reloadedCfg.getWidgets()).hasSize(17);
    Optional<Widget> updatedWidget = reloadedCfg.getWidgets().stream().filter(w -> widgetId.equals(w.id)).findFirst();
    assertThat(updatedWidget).isPresent();
    assertThat(updatedWidget.get().title).isEqualTo(newWidgetTitle);
  }

}