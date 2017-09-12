package com.thorpora.ezdashing.consumer;

import feign.Retryer;

import java.util.concurrent.TimeUnit;

public class FeignRetryer extends Retryer.Default {

  public FeignRetryer() {
    super(1000L, TimeUnit.SECONDS.toMillis(10L), 2);
  }
}
