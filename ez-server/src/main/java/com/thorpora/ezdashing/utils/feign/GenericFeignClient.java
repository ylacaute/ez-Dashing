package com.thorpora.ezdashing.utils.feign;

import feign.HeaderMap;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;

import java.util.Map;

public interface GenericFeignClient {

    @RequestLine("GET /{path}")
    String query(
            @HeaderMap Map<String, String> headerMap,
            @Param("path") String path,
            @QueryMap Map<String, String> params);

}
