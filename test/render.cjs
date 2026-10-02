const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const { inflateSync } = require("node:zlib");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const qr = require("qr-image-color");
const fixtures = require("./fixtures.json");

// These are local PNG renders. No browser, fetch, or external QR service is used.
function imageData(component, props) {
  const markup = renderToStaticMarkup(React.createElement(component, props));
  const match = markup.match(/src="data:image\/png;base64, ([^"]+)"/);
  assert.ok(match, "the image keeps its PNG data URI format");
  return { markup, png: Buffer.from(match[1], "base64") };
}

function pixels(png) {
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  const chunks = [];
  const compressed = [];
  let width;
  let height;
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
    }
    if (["IHDR", "PLTE", "tRNS"].includes(type)) chunks.push(data);
    if (type === "IDAT") compressed.push(data);
    offset += length + 12;
  }
  // Hash uncompressed image data so differences between zlib versions do not
  // invalidate a fixture when the generated pixels and palette are unchanged.
  chunks.push(inflateSync(Buffer.concat(compressed)));
  return {
    width,
    height,
    sha256: createHash("sha256").update(Buffer.concat(chunks)).digest("hex"),
  };
}

const cases = [
  { name: "empty", props: {} },
  { name: "defaults", props: { text: "hello" } },
  {
    name: "custom",
    props: {
      text: "Local QR fixture: café & <hello>",
      color: "#234567",
      background: "#fedcba",
      size: 2,
      margin: 1,
      ecLevel: "H",
    },
  },
  {
    name: "transparent",
    props: { text: "transparent", transparent: true, color: "red" },
  },
];

async function main() {
  const commonjs = require("../dist/index.js");
  const esm = await import("../dist/index.mjs");
  assert.deepEqual(Object.keys(commonjs), ["default"]);
  assert.deepEqual(Object.keys(esm), ["default"]);
  for (const [format, component] of [
    ["CommonJS", commonjs.default],
    ["ESM", esm.default],
  ]) {
    for (const { name, props } of cases) {
      const actual = imageData(component, props);
      assert.deepEqual(
        pixels(actual.png),
        fixtures[name],
        `${format}: ${name}`
      );
      assert.match(actual.markup, /^<img alt="" /);
    }
    const text = imageData(component, { text: "hello" }).png;
    assert.deepEqual(imageData(component, { children: "hello" }).png, text);
    assert.deepEqual(
      imageData(component, {
        text: "hello",
        children: "this should not be encoded",
      }).png,
      text
    );
    assert.deepEqual(
      imageData(component, {
        text: "",
        children: [
          "he",
          42,
          null,
          false,
          React.createElement("span", { key: "x" }, "ignored"),
          ["llo"],
        ],
      }).png,
      text
    );
    const extra = imageData(component, {
      text: "hello",
      alt: "QR preview",
      id: "qr",
      width: 145,
      "data-fixture": "local",
      src: "https://invalid.example/never-requested.png",
    });
    assert.match(extra.markup, /alt="QR preview"/);
    assert.match(extra.markup, /id="qr"/);
    assert.match(extra.markup, /width="145"/);
    assert.match(extra.markup, /data-fixture="local"/);
    assert.doesNotMatch(extra.markup, /invalid\.example| text=| ecLevel=/);
    assert.deepEqual(extra.png, text);
    // Verify the existing option names and defaults independently of tsup.
    assert.deepEqual(
      text,
      qr.imageSync("hello", {
        type: "png",
        ecLevel: "M",
        size: 5,
        margin: 4,
        transparent: false,
        color: "#000",
        background: undefined,
      })
    );
    console.log(
      `${format}: PNG fixtures, children, text precedence, image props, and empty-input rendering passed`
    );
  }
}

if (require.main === module)
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
module.exports = { imageData, pixels, cases };
