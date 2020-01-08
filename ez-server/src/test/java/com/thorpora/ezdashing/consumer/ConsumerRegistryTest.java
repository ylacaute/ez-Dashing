package com.thorpora.ezdashing.consumer;

import com.thorpora.ezdashing.dashboard.model.Dashboard;
import com.thorpora.ezdashing.dashboard.model.DataSource;
import com.thorpora.ezdashing.dashboard.model.DataSourceQuery;
import com.thorpora.ezdashing.exception.QueryConfigNotFound;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;

import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static java.util.Collections.singletonList;
import static java.util.Optional.of;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ConsumerRegistryTest {

    @Mock
    private ConsumerFactory consumerFactory;

    @Mock
    private Dashboard dashboard;

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should fail to register consumer because unknown queryId")
    void shouldFailBecauseUnknownQueryId() {
        // GIVEN
        HashMap<String, Consumer> consumers = new HashMap<>();
        ConsumerRegistry consumerRegistry = new ConsumerRegistry(consumerFactory, consumers, dashboard);

        // WHEN - THEN
        Assertions.assertThatThrownBy(() -> consumerRegistry.getConsumer("newQueryId"))
                .isInstanceOf(QueryConfigNotFound.class);
    }

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Get consumer should trigger register new queryId")
    void shouldRegisterNewQueryId() {
        // GIVEN
        HashMap<String, Consumer> consumers = new HashMap<>();
        ConsumerRegistry consumerRegistry = new ConsumerRegistry(consumerFactory, consumers, dashboard);
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
        when(dashboard.getDataSourceByQueryId("newQueryId"))
                .thenReturn(of(dataSource));
        Consumer fakeConsumer = new Consumer(null, null, null);
        when(consumerFactory.create(Mockito.any(), Mockito.eq(dataSource)))
                .thenReturn(fakeConsumer);

        // WHEN - THEN
        Consumer consumer = consumerRegistry.getConsumer("newQueryId");

        // THEN
        assertThat(consumer).isEqualTo(fakeConsumer);
    }

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Get consumer should not trigger register a new one because already exist")
    void shouldGetConsumerWithoutRegisterBecauseAlreadyExist() {
        // GIVEN
        String queryId = "newQueryId";
        Consumer fakeConsumer = new Consumer(null, null, null);
        HashMap<String, Consumer> consumers = new HashMap<>();
        consumers.put(queryId, fakeConsumer);
        ConsumerRegistry consumerRegistry = new ConsumerRegistry(consumerFactory, consumers, dashboard);
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

        // WHEN - THEN
        Consumer consumer = consumerRegistry.getConsumer(queryId);

        // THEN
        assertThat(consumer).isEqualTo(fakeConsumer);
        verifyNoMoreInteractions(consumerFactory);
    }

}