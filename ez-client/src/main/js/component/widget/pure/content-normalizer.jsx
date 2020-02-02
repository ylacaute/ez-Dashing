

export default class ContentNormalizer {

  static normalize(pureWidgetProps) {
    const {thresholds} = pureWidgetProps;
    let normalizedContent;

    if (!pureWidgetProps.content) {
      normalizedContent = [{
        value: pureWidgetProps.value,
        content: "${value}"
      }];
    } else {
      const contentType = typeof pureWidgetProps.content;
      switch (contentType) {
        case "string":
          normalizedContent = [{
            value: pureWidgetProps.value,
            content: pureWidgetProps.content
          }];
          break;
        case "object":
          if (Array.isArray(pureWidgetProps.content)) {
            normalizedContent = pureWidgetProps.content;
          } else {
            normalizedContent = [pureWidgetProps.content];
          }
          break;
        default:
          throw new Error(`Unknown content type ${contentType}`);
      }
    }
    normalizedContent = normalizedContent.map(elt => {
      if (elt.type == null || elt.type === "metric") {
        return {
          ...elt,
          type: elt.type || "metric",
          value: elt.value || "You must set the value property.",
          content: elt.content || "${value}",
          thresholds: elt.thresholds || thresholds
        }
      } else {
        return elt;
      }
    });
    return {
      ...pureWidgetProps,
      content: normalizedContent
    };
  }

}
