
export default class MathUtils {

  static randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static distanceTo(pointA, pointB) {
    const xDiff = (pointB.x - pointA.x) ** 2;
    const yDiff = (pointB.y - pointA.y) ** 2;

    return Math.sqrt(xDiff + yDiff);
  };

  static length(numA, numB) {
    return Math.abs(numA - numB);
  };

  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

}

