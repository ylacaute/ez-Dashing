package com.thorpora.ezdashing.dashboard.model;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.thorpora.ezdashing.TestTag.ADVANCED_UNIT_TEST;
import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.entry;

public class DashboardConfigurationTest {

  private static final ClassLoader classLoader = DashboardConfigurationTest.class.getClassLoader();
  private static final String DASHBOARD_JSON = "dashboard.json";
  private static File file;
  private static File savedFile;

  /**
   * We use a temp save file in order to not alter the dashboard.json file for other tests
   */
  @BeforeAll
  public static void beforeAll() throws IOException {
    file = new File(classLoader.getResource(DASHBOARD_JSON).getFile());
    savedFile = File.createTempFile(DASHBOARD_JSON, ".tmp");
    savedFile.deleteOnExit();
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Construct a Dashboard configuration from a valid json file")
  public void verifyValidJsonLoad() {
    // WHEN
    DashboardConfiguration cfg = new DashboardConfiguration(file);

    // THEN
    assertThat(cfg.getDataSources()).hasSize(3);
    assertThat(cfg.getDataSource("jira-sprint-active")).isNotNull();
    assertThat(cfg.getWidgets()).hasSize(18);
    assertThat(cfg.getEnv()).contains(entry("jiraBoardId", "124"));
  }

  @Test
  @Tag(ADVANCED_UNIT_TEST)
  @DisplayName("Load config, modify a widget title, save config, reload with modifications")
  public void verifyReadWriteConfiguration() throws IOException {
    // GIVEN
    String widgetId = "sampleUniqueId";
    String newWidgetTitle = "new Title !!!";
    Map<String, Object> fields = new HashMap<>();
    fields.put("title", newWidgetTitle);

    // WHEN
    DashboardConfiguration cfg = new DashboardConfiguration(file);
    assertThat(cfg.getWidgets()).hasSize(18);
    cfg.updateWidget(widgetId, fields);
    cfg.save(savedFile);

    // THEN
    DashboardConfiguration reloadedCfg = new DashboardConfiguration(savedFile);
    assertThat(reloadedCfg.getWidgets()).hasSize(18);
    Optional<Widget> updatedWidget = reloadedCfg.getWidgets()
            .stream()
            .filter(w -> widgetId.equals(w.id()))
            .findFirst();
    assertThat(updatedWidget).isPresent();
    assertThat(updatedWidget.get().title()).isEqualTo(newWidgetTitle);
  }

  @Test
  @Tag(ADVANCED_UNIT_TEST)
  @DisplayName("Load config, modify a widget int array, save config, reload with modifications")
  public void verifyReadWriteConfiguration2() throws IOException {
    // GIVEN
    String widgetId = "velocityUniqueId";
    int[] integerArray = {0, 1};
    Map<String, Object> fields = new HashMap<>();
    fields.put("velocity", integerArray);

    // WHEN
    DashboardConfiguration cfg = new DashboardConfiguration(file);
    assertThat(cfg.getWidgets()).hasSize(18);
    cfg.updateWidget(widgetId, fields);
    cfg.save(savedFile);

    // THEN
    DashboardConfiguration reloadedCfg = new DashboardConfiguration(savedFile);
    assertThat(reloadedCfg.getWidgets()).hasSize(18);
    Optional<Widget> updatedWidget = reloadedCfg.getWidgets()
            .stream()
            .filter(w -> widgetId.equals(w.id()))
            .findFirst();
    assertThat(updatedWidget).isPresent();
    assertThat(updatedWidget.get().getAsIntList("velocity"))
            .containsExactly(0, 1);
  }

}