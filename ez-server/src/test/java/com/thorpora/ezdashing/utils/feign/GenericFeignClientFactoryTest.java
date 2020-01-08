package com.thorpora.ezdashing.utils.feign;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class GenericFeignClientFactoryTest {

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should fail to create feign client because invalid basePath")
    void shouldFailBecauseInvalidBasePath() {
        // GIVEN
        GenericFeignClientFactory factory = new GenericFeignClientFactory();
        Credentials cred = null;
        String baseUrl = null; // same for empty

        // WHEN - THEN
        assertThatThrownBy(() -> factory.create(cred, baseUrl))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @Tag(BASE_UNIT_TEST)
    @DisplayName("Should fail to create feign client because invalid basePath")
    void shouldCreateFeignClientWithCredentials() {
        // GIVEN
        GenericFeignClientFactory factory = new GenericFeignClientFactory();
        Credentials cred = Credentials
                .builder()
                .password("pwd")
                .userName("usr")
                .build();
        String baseUrl = "/baseUrl";

        // WHEN - THEN
        GenericFeignClient client = factory.create(cred, baseUrl);

        // THEN (No check, we trust Feign)
        Assertions.assertThat(client).isNotNull();
    }

}