package com.thorpora.ezdashing.utils.json;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.thorpora.ezdashing.TestTag.ADVANCED_UNIT_TEST;
import static com.thorpora.ezdashing.TestTag.BASE_UNIT_TEST;
import static com.thorpora.ezdashing.utils.json.JsonUtils.*;
import static com.thorpora.ezdashing.utils.json.PatchOperation.INSERT_OR_ADD;
import static com.thorpora.ezdashing.utils.json.PatchOperation.INSERT_OR_REPLACE;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

class JsonUtilsTest {

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Verify base serialization behaviour")
  void verifyBaseSerializationBehaviour() {
    // GIVEN
    SampleBean defaultBean = createDefaultBean();

    // WHEN
    String beanAsString = toJson(defaultBean);
    SampleBean readBean = fromJson(beanAsString, SampleBean.class);

    // THEN
    assertThat(readBean).isEqualToComparingFieldByField(readBean);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode with a new string field")
  void pathNodeWithNewStringField() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    String newFieldName = "hello";
    String newFieldValue = "world";

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, newFieldName, newFieldValue);

    // THEN
    assertThat(jsonNode.has(newFieldName)).isTrue();
    assertThat(jsonNode.get(newFieldName).asText()).isEqualTo(newFieldValue);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode with a new string field")
  void pathNodeWithNewStringListField() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    String newFieldName = "hello";
    List<String> newFieldValue = Collections.singletonList("world");

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, newFieldName, newFieldValue);

    // THEN
    assertThat(jsonNode.has(newFieldName)).isTrue();
    ArrayNode arrayNode = (ArrayNode) jsonNode.get(newFieldName);
    assertThat(arrayNode.get(0).asText()).isEqualTo(newFieldValue.get(0));
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by updating a String field")
  void pathNodeWithStringUpdate() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    String newName = "newName";

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "name", newName);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getName()).isEqualTo(newName);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode array by adding a string to a string list field")
  void pathNodeByAddingStringToListStringField() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    String newValue = "4";

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "stringListValues", newValue);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getStringListValues()).containsExactly("1", "2", "3", "4");
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode array by ADDING a list of String to a string list field")
  void pathNodeWithAddOperationOnStringList() {
    // GIVEN
    PatchOperation operation = INSERT_OR_ADD;
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    List<String> newValues = Collections.singletonList("4");

    // WHEN
    patchNode(operation, jsonNode, "stringListValues", newValues);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getStringListValues()).containsExactly("1", "2", "3", "4");
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode array by REPLACING a list of String by a new one")
  void pathNodeWithReplaceOperationOnStringList() {
    // GIVEN
    PatchOperation operation = INSERT_OR_REPLACE;
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    List<String> newValues = Collections.singletonList("4");

    // WHEN
    patchNode(operation, jsonNode, "stringListValues", newValues);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getStringListValues()).containsExactly("4");
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding a int value to an array field")
  void pathNodeWithArrayAdd() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    int[] newInts = {4};

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "intValues", newInts);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getIntValues()).containsExactly(1, 2, 3, 4);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding a int value to an array field (but with an Object as dynamic type)")
  void pathNodeWithAddOperationOnObjectList() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    Object[] newObjects = {4};

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "objectValues", newObjects);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getObjectValues()).containsExactly(1, 2, 3, 4);
  }

  @Test
  @Tag(BASE_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding integers from a List to an array field")
  void pathNodeWithAddOperationOnIntegerList() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    List<Integer> newValues = Collections.singletonList(4);

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, "intListValues", newValues);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getIntListValues()).containsExactly(1, 2, 3, 4);
  }

  @Test
  @Tag(ADVANCED_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding integers from a List to an array field")
  void pathNodeWithMapWithDefaultReplaceOperation() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    List<Integer> newIntValues = Collections.singletonList(4);
    String newNameValue = "new";
    Map<String, Object> map = new HashMap<>();
    map.put("name", newNameValue);
    map.put("intListValues", newIntValues);

    // WHEN
    patchNode(jsonNode, map);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getIntListValues()).containsExactly(4);
    assertThat(result.getName()).isEqualTo(newNameValue);
  }


  @Test
  @Tag(ADVANCED_UNIT_TEST)
  @DisplayName("Patch a jsonNode by adding integers from a List to an array field")
  void pathNodeWithMap() {
    // GIVEN
    ObjectNode jsonNode = valueToTree(createDefaultBean());
    List<Integer> newIntValues = Collections.singletonList(42);
    String newNameValue = "Bob";
    Map<String, Object> map = new HashMap<>();
    map.put("name", newNameValue);
    map.put("intListValues", newIntValues);

    // WHEN
    patchNode(INSERT_OR_ADD, jsonNode, map);

    // THEN
    SampleBean result = JsonUtils.treeToValue(jsonNode, SampleBean.class);
    assertThat(result.getIntListValues()).containsExactly(1, 2, 3, 42);
    assertThat(result.getName()).isEqualTo(newNameValue);
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