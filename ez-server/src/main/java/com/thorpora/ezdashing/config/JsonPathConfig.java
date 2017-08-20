package com.thorpora.ezdashing.config;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.Option;
import com.jayway.jsonpath.spi.json.JacksonJsonProvider;
import com.jayway.jsonpath.spi.json.JsonProvider;
import com.jayway.jsonpath.spi.mapper.JacksonMappingProvider;
import com.jayway.jsonpath.spi.mapper.MappingProvider;

import java.util.EnumSet;
import java.util.Set;

/**
 * Using the JacksonJsonProvider allow to use TypeRef (we can't with the default smart-Provider)
 */
public class JsonPathConfig implements Configuration.Defaults {

  private final JsonProvider jsonProvider = new JacksonJsonProvider();
  private final MappingProvider mappingProvider = new JacksonMappingProvider();

  @Override
  public JsonProvider jsonProvider() {
    return jsonProvider;
  }

  @Override
  public MappingProvider mappingProvider() {
    return mappingProvider;
  }

  @Override
  public Set<Option> options() {
    return EnumSet.noneOf(Option.class);
  }

}
