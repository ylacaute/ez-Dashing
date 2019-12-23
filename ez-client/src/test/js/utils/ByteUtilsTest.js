import ByteUtils from "utils/ByteUtils";


describe("ByteUtils", () => {

  it("asLabel() should handle label with Mo if < 1000", () => {
    let label = ByteUtils.asLabel(900);
    expect(label).toStrictEqual("900 Mo");
  });

  it("asLabel() should handle label with Go if > 1000", () => {
    let label = ByteUtils.asLabel(3000);
    expect(label).toStrictEqual("3 Go");
  });

  it("asLabel() should handle label with Mo if = 1000", () => {
    let label = ByteUtils.asLabel(1000);
    expect(label).toStrictEqual("1000 Mo");
  });

  it("asLabel() should handle label with Go with float", () => {
    let label = ByteUtils.asLabel(1500);
    expect(label).toStrictEqual("1.5 Go");
  });

});

