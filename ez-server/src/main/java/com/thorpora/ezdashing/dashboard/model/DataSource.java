package com.thorpora.ezdashing.dashboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.thorpora.ezdashing.utils.feign.Credentials;
import io.micrometer.core.lang.Nullable;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static lombok.AccessLevel.PRIVATE;

@Value
@FieldDefaults(level = PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DataSource {

  @NonNull
  String baseUrl;

  @Nullable
  Credentials credentials;

  @NonNull
  @Builder.Default
  Map<String, String> headers = new HashMap<>();

  @NonNull
  @Builder.Default
  List<DataSourceQuery> queries = new ArrayList<>();

  /**
   * Refresh in seconds
   */
  @Builder.Default
  int refresh = 3600;

}


