package com.thorpora.ezdashing.consumer;

import com.thorpora.ezdashing.dashboard.model.DataSource;
import com.thorpora.ezdashing.utils.feign.GenericFeignClient;
import com.thorpora.ezdashing.utils.feign.GenericFeignClientFactory;
import feign.Feign;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;

@ExtendWith(MockitoExtension.class)
class ConsumerFactoryTest {

    @Mock
    private GenericFeignClientFactory genericFeignClientFactory;

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should create consumer")
    void shouldCreateConsumer() {
        // GIVEN
        ConsumerFactory factory = new ConsumerFactory(genericFeignClientFactory);
        Map<String, String> env = new HashMap<>();
        String baseUrl = "baseUrl";
        GenericFeignClient simpleClient = Feign.builder().target(GenericFeignClient.class, baseUrl);
        DataSource ds = DataSource
                .builder()
                .credentials(null)
                .baseUrl(baseUrl)
                .build();
        Mockito.when(genericFeignClientFactory.create(any(), isNull(), eq(baseUrl)))
                .thenReturn(simpleClient);

        // WHEN
        Consumer consumer = factory.create(env, ds);

        // THEN
        assertThat(consumer).isNotNull();
        assertThat(consumer.getDataSource()).isEqualTo(ds);
        assertThat(consumer.getEnvironment()).isEqualTo(env);
        assertThat(consumer.getHttpClient()).isEqualTo(simpleClient);
    }

}