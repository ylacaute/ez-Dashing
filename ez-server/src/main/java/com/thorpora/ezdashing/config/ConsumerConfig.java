package com.thorpora.ezdashing.config;

import com.thorpora.ezdashing.consumer.ConsumerFactory;
import com.thorpora.ezdashing.consumer.ConsumerRegistry;
import com.thorpora.ezdashing.dashboard.model.Dashboard;
import com.thorpora.ezdashing.utils.feign.GenericFeignClientFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
public class ConsumerConfig {

    @Bean
    public GenericFeignClientFactory apiConsumerFactory() {
        return new GenericFeignClientFactory();
    }

    @Bean
    public ConsumerFactory consumerFactory(GenericFeignClientFactory genericFeignClientFactory) {
        return new ConsumerFactory(genericFeignClientFactory);
    }

    @Bean
    public ConsumerRegistry ConsumerRegistry(ConsumerFactory consumerFactory, Dashboard dashboard) {
        return new ConsumerRegistry(
                consumerFactory,
                new HashMap<>(),
                dashboard);
    }

}
