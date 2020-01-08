package com.thorpora.ezdashing.consumer;

import com.thorpora.ezdashing.dashboard.model.DataSource;
import com.thorpora.ezdashing.utils.feign.GenericFeignClient;
import com.thorpora.ezdashing.utils.feign.GenericFeignClientFactory;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@AllArgsConstructor
public class ConsumerFactory {

    private GenericFeignClientFactory genericFeignClientFactory;

    public Consumer create(Map<String, String> environment, DataSource dataSource) {
        Map<String, String> env = environment != null ? environment : new HashMap<>();
        GenericFeignClient httpClient = genericFeignClientFactory.create(
                new FeignRetryer(),
                dataSource.getCredentials(),
                dataSource.getBaseUrl());

        return new Consumer(httpClient, dataSource, env);
    }

}
