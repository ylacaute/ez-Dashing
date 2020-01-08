package com.thorpora.ezdashing.consumer;

import com.thorpora.ezdashing.dashboard.model.DataSource;
import com.thorpora.ezdashing.dashboard.model.DataSourceQuery;
import com.thorpora.ezdashing.exception.QueryConfigNotFound;
import com.thorpora.ezdashing.utils.feign.GenericFeignClient;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ConsumerTest {

    @Mock
    GenericFeignClient simpleClient;

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should fail to call query because not found")
    void shouldFailToCallQueryBecauseNotFound() {
        // GIVEN
        Map<String, String> env = new HashMap<>();
        DataSource dataSource = DataSource
                .builder()
                .baseUrl("baseUrl")
                .refresh(3600)
                .queries(new ArrayList<>())
                .build();
        Consumer consumer = new Consumer(simpleClient, dataSource, env);

        // WHEN - THEN
        assertThatThrownBy(() -> consumer.doQuery("badId", new HashMap<>()))
                .isInstanceOf(QueryConfigNotFound.class)
                .hasMessageContaining("badId");
    }

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should call query without any queryParams")
    void shouldCallQueryWithoutParams() {
        // GIVEN
        Map<String, String> env = new HashMap<>();
        Map<String, String> params = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();
        DataSourceQuery query = DataSourceQuery
                .builder()
                .id("id")
                .path("queryPath")
                .build();
        DataSource dataSource = DataSource
                .builder()
                .baseUrl("baseUrl")
                .refresh(3600)
                .queries(singletonList(query))
                .build();
        Consumer consumer = new Consumer(simpleClient, dataSource, env);
        when(simpleClient.query(eq(headerMap), eq("queryPath"), eq(params)))
                .thenReturn("result");

        // WHEN
        String result = consumer.doQuery("id", params);

        // THEN
        assertThat(result).isEqualTo("result");
    }

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should call query with queryParams")
    void shouldCallQueryWithParams() {
        // GIVEN
        Map<String, String> env = new HashMap<>();
        Map<String, String> params = new HashMap<>();
        params.put("name", "value");
        Map<String, String> headerMap = new HashMap<>();
        DataSourceQuery query = DataSourceQuery
                .builder()
                .id("id")
                .path("queryPath?name=value")
                .build();
        DataSource dataSource = DataSource
                .builder()
                .baseUrl("baseUrl")
                .refresh(3600)
                .queries(singletonList(query))
                .build();
        Consumer consumer = new Consumer(simpleClient, dataSource, env);
        when(simpleClient.query(eq(headerMap), eq("queryPath"), eq(params)))
                .thenReturn("result");

        // WHEN
        String result = consumer.doQuery("id", params);

        // THEN
        assertThat(result).isEqualTo("result");
    }

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should call query with headers")
    void shouldCallQueryWithHeaders() {
        // GIVEN
        Map<String, String> env = new HashMap<>();
        Map<String, String> params = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("name", "value");
        DataSourceQuery query = DataSourceQuery
                .builder()
                .id("id")
                .path("queryPath")
                .build();
        DataSource dataSource = DataSource
                .builder()
                .baseUrl("baseUrl")
                .headers(headerMap)
                .refresh(3600)
                .queries(singletonList(query))
                .build();
        Consumer consumer = new Consumer(simpleClient, dataSource, env);
        when(simpleClient.query(eq(headerMap), eq("queryPath"), eq(params)))
                .thenReturn("result");

        // WHEN
        String result = consumer.doQuery("id", params);

        // THEN
        assertThat(result).isEqualTo("result");
    }

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should call query by replacing variables in queryParams")
    void shouldCallQueryWithQueryParamsAndReplaceVarFromEnv() {
        // GIVEN
        Map<String, String> env = new HashMap<>();
        env.put("nameVariable", "name");
        env.put("valueVariable", "value");
        env.put("emptyVariable", "");
        Map<String, String> params = new HashMap<>();
        params.put("name", "value");
        Map<String, String> headerMap = new HashMap<>();
        DataSourceQuery query = DataSourceQuery
                .builder()
                .id("id")
                .path("query${emptyVariable}Path?${nameVariable}=${valueVariable}")
                .build();
        DataSource dataSource = DataSource
                .builder()
                .baseUrl("baseUrl")
                .refresh(3600)
                .queries(singletonList(query))
                .build();
        Consumer consumer = new Consumer(simpleClient, dataSource, env);
        when(simpleClient.query(eq(headerMap), eq("queryPath"), eq(params)))
                .thenReturn("result");

        // WHEN
        String result = consumer.doQuery("id", params);

        // THEN
        assertThat(result).isEqualTo("result");
    }

}