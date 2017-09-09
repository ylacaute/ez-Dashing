package com.thorpora.ezdashing.dashboard;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static org.apache.http.HttpStatus.SC_OK;
import static org.hamcrest.Matchers.equalTo;

class DashboardControllerIT extends AbstractIT {

  @Test
  @Tag("baseIT")
  @DisplayName("Load the application and retrieve the dashboard config")
  public void getDashboardConfig() {
    RestAssured
            .given()
              .contentType(ContentType.JSON)
            .when()
              .get("/api/dashboard/config/")
            .then()
              .statusCode(SC_OK)
              .contentType(ContentType.JSON);
  }

  @Test
  @Tag("baseIT")
  @DisplayName("Load the application and patch an existing widget (title update)")
  public void patchWidgetTitle() {
    String widgetId = "sampleUniqueId";
    String newWidgetTitle = "newTitleFromIT";
    Map<String, String> fields = new HashMap<>();
    fields.put("title", newWidgetTitle);

    RestAssured
            .given()
              .contentType(ContentType.JSON)
              .pathParam("widgetId", widgetId)
              .body(fields)
            .when()
              .patch("/api/dashboard/config/widgets/{widgetId}")
            .then()
              .statusCode(SC_OK);
  }

  @Test
  @Tag("storyLineIT")
  @DisplayName("Patch an existing widget and retrieve a new configuration which must be updated")
  public void patchWidgetTitleAndCheckNewConfiguration() {
    String widgetId = "sampleUniqueId";
    String newWidgetTitle = "HelloWorld_" + LocalDateTime.now();
    Map<String, String> fields = new HashMap<>();
    fields.put("title", newWidgetTitle);

    RestAssured
            .given()
              .contentType(ContentType.JSON)
              .pathParam("widgetId", widgetId)
              .body(fields)
            .when()
              .patch("/api/dashboard/config/widgets/{widgetId}")
            .then()
              .statusCode(SC_OK);

    RestAssured
            .given()
              .contentType(ContentType.JSON)
            .when()
              .get("/api/dashboard/config/")
            .then()
              .statusCode(SC_OK)
              .contentType(ContentType.JSON)
            .body("widgets.find {it.id == 'sampleUniqueId'}.title", equalTo(newWidgetTitle));
  }
}