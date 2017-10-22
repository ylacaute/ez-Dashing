package com.thorpora.ezdashing.utils;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.thorpora.ezdashing.TestTag;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static com.thorpora.ezdashing.utils.JsonUtils.*;
import static com.thorpora.ezdashing.utils.PatchOperation.INSERT_OR_ADD;
import static java.util.Arrays.asList;

class JsonUtilsTest {

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Verify base serialization behaviour")
  public void verifyBaseSerializationBehaviour() {
    // GIVEN
    SampleBean defaultBean = createDefaultBean();

    // WHEN
    String beanAsString = toJson(defaultBean);
    SampleBean readBean = fromJson(beanAsString, SampleBean.class);

    // THEN
    Assertions.assertThat(readBean).isEqualToComparingFieldByField(readBean);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by updating a String field")
  public void pathNodeWithStringUpdate() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    String newName = "newName";

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "name", newName);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    Assertions.assertThat(result.getName()).isEqualTo(newName);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding a int value to an array field")
  public void pathNodeWithArrayAdd() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    int[] newInts = {4};

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "intValues", newInts);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    Assertions.assertThat(result.getIntValues()).containsExactly(1, 2, 3, 4);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding a int value to an array field (but with an Object as dynamic type)")
  public void pathNodeWithAddOperationOnObjectList() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    Object[] newObjects = {4};

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "objectValues", newObjects);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    Assertions.assertThat(result.getObjectValues()).containsExactly(1, 2, 3, 4);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding integers from a List to an array field")
  public void pathNodeWithAddOperationOnIntegerList() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    List<Integer> newValues = Collections.singletonList(4);

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "intListValues", newValues);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    Assertions.assertThat(result.getIntListValues()).containsExactly(1, 2, 3, 4);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode array by adding strings from a List to an array field")
  public void pathNodeWithAddOperationOnStringList() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    List<String> newValues = Collections.singletonList("4");

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "stringListValues", newValues);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    Assertions.assertThat(result.getStringListValues()).containsExactly("1", "2", "3", "4");
  }

  private SampleBean createDefaultBean() {
    int[] ints = {1, 2, 3};
    Object[] objs = {1, 2, 3};
    SampleBean bean = new SampleBean();
    bean.setName("initialName");
    bean.setIntValues(ints);
    bean.setObjectValues(objs);
    bean.setIntListValues(asList(1, 2, 3));
    bean.setStringListValues(asList("1", "2", "3"));
    return bean;
  }


}