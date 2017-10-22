package com.thorpora.ezdashing.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static com.thorpora.ezdashing.utils.Ints.asList;
import static org.assertj.core.api.Assertions.assertThat;

class IntsTest {

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Ints.asList(null) should return null")
  public void asListOfNull() {
    // GIVEN
    int[] arg = null;

    // WHEN
    List<Integer> integers = asList(arg);

    // THEN
    assertThat(integers).isNull();
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Ints.asList(int[0]) should return an empty List")
  public void asListOfEmpty() {
    // GIVEN
    int[] arg = new int[0];

    // WHEN
    List<Integer> integers = asList(arg);

    // THEN
    assertThat(integers).isEmpty();
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Ints.asList({0, 1, 2}) should return a List containing the same ordered elements")
  public void asListOfMany() {
    // GIVEN
    int[] arg = {0, 1, 2};

    // WHEN
    List<Integer> integers = asList(arg);

    // THEN
    assertThat(integers).containsExactly(0, 1, 2);
  }

}