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

import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.TypeRef;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class DashboardConfiguration {

  String content;
  List<DataSource> dataSources;

  public DashboardConfiguration(String content) {
    this.content = content;
  }

  public List<DataSource> getDataSources() {
    if (this.dataSources == null) {
      this.dataSources = JsonPath
              .parse(content)
              .read("$.dashboard.dataSources", new TypeRef<List<DataSource>>(){});
    }
    return dataSources;
  }

  public Optional<DataSource> getDataSource(String queryId) {
    for (DataSource ds : getDataSources()) {
      if (ds.getQueries().stream().anyMatch(q -> queryId.equals(q.getId()))) {
        return Optional.of(ds);
      }
    }
    return Optional.empty();
  }

}
