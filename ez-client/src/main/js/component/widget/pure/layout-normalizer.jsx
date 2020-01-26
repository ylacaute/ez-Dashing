

function normalizeByString(layoutName) {
  switch (layoutName) {
    case "mosaic":
      return {
        type: "mosaic"
      };
    default:
      throw new Error(`Unknown layout name ${layoutName}`);
  }
}

function normalizeByObject(layoutObject) {
  return layoutObject;
}

export default class LayoutNormalizer {

  static normalize(layout) {
    const layoutType = typeof layout;

    switch (layoutType) {
      case "string":
        return normalizeByString(layout);
      case "object":
        return normalizeByObject(layout);
      default:
        throw new Error(`Unknown layout type ${layoutType}`);
    }
  }

}