package com.thorpora.ezdashing.utils;

import java.util.ArrayList;
import java.util.List;

public class Ints {

  public static List<Integer> asList(int[] intValues) {
    if (intValues == null) return null;

    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < intValues.length; i++) {
      result.add(intValues[i]);
    }
    return result;
  }

}
