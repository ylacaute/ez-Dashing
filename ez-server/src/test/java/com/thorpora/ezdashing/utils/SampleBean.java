package com.thorpora.ezdashing.utils;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Slf4j
@FieldDefaults(level = PRIVATE)
@Getter
@Setter
public class SampleBean {

  String name;

  int[] intValues;

  Object[] objectValues;

  List<Integer> intListValues;

  List<String> stringListValues;

}
