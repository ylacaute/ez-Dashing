package com.thorpora.ezdashing.utils.assertutils;

public class FailFast {

  public static void requireTrue(boolean expression, String message) {
    if (!expression) {
      throw new IllegalArgumentException(message);
    }
  }

}
