package com.thorpora.ezdashing.utils.feign;

import feign.Feign;
import feign.Logger;
import feign.Retryer;
import feign.auth.BasicAuthRequestInterceptor;
import feign.slf4j.Slf4jLogger;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import static org.apache.commons.lang3.StringUtils.isEmpty;

@Slf4j
public class GenericFeignClientFactory {

    public GenericFeignClient create(Credentials cred, String baseUrl) {
        return create(null, cred, baseUrl);
    }

    public GenericFeignClient create(
            Retryer retryer,
            Credentials cred,
            String baseUrl) {

        assertValidBaseUrl(baseUrl);
        Feign.Builder builder = Feign.builder();
        if (isValidCredentials(cred)) {
            builder.requestInterceptor(new BasicAuthRequestInterceptor(
                    cred.getUserName(),
                    cred.getPassword()));
        }
        if (retryer != null) {
            builder.retryer(retryer);
        }
        return builder
                .logger(new Slf4jLogger(GenericFeignClient.class))
                .logLevel(Logger.Level.NONE)
                .target(GenericFeignClient.class, baseUrl);
    }

    private void assertValidBaseUrl(String baseUrl) {
        if (StringUtils.isEmpty(baseUrl)) {
            throw new IllegalArgumentException("baseUrl can't be null to create a feign client");
        }
    }

    private boolean isValidCredentials(Credentials cred) {
        return cred != null && !isEmpty(cred.getUserName()) && !isEmpty(cred.getPassword());
    }

}
