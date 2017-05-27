

class ObjectUtils {}

ObjectUtils.isNullOrEmpty = function(obj) {
  return obj == null || Object.keys(obj).length == 0;
};

module.exports = ObjectUtils;

