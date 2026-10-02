<div align="center">
  <img src="./header.png" alt="Preview of QR codes generated">
</div>

# react-qr-image

[![package version](https://img.shields.io/npm/v/react-qr-image.svg?style=flat-square)](https://npmjs.org/package/react-qr-image)
[![package downloads](https://img.shields.io/npm/dm/react-qr-image.svg?style=flat-square)](https://npmjs.org/package/react-qr-image)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/react-qr-image.svg?style=flat-square)](https://npmjs.org/package/react-qr-image)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A React component for a QR image generated from text.

## 📖 Table of Contents

- [react-qr-image](#react-qr-image)
  - [📖 Table of Contents](#-table-of-contents)
  - [⚙️ Install](#️-install)
  - [📖 Usage](#-usage)
  - [📚 API](#-api)
  - [💬 Contributing](#-contributing)
  - [🪪 License](#-license)

## ⚙️ Install

Install the package locally within you project folder with your package manager:

With `npm`:

```sh
npm install react-qr-image
```

With `yarn`:

```sh
yarn add react-qr-image
```

With `pnpm`:

```sh
pnpm add react-qr-image
```

## 📖 Usage

```js
import React from "react";
import ReactDOM from "react-dom";

import QRImage from "react-qr-image";

function App() {
  return (
    <>
      <QRImage text="hello" />
      <QRImage text="hello" color="red" />
      <QRImage text="hello" color="white" background="#111" />
      <QRImage>hello</QRImage>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

[![Edit wispy-haze-cvm06](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wispy-haze-cvm06?fontsize=14)

## 📚 API

For all configuration options, please see the [API docs](https://paka.dev/npm/react-qr-image).

## 💬 Contributing

Got an idea for a new feature? Found a bug? Contributions are welcome! Please [open up an issue](https://github.com/tiaanduplessis/react-qr-image/issues) or [make a pull request](https://makeapullrequest.com/).

### Development

Use Node.js 22 or 24 and pnpm 10.34.6 for development. The generated library
still targets Node.js 16 and keeps CommonJS, ESM, and TypeScript declaration
entry points.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm run types:check
pnpm test
pnpm run format:check
```

The test suite renders QR images locally through both module formats and checks
PNG pixel fixtures, child text handling, image props, and the existing type
contract. No external QR service is contacted. `example.tsx` is a standalone
browser usage example, so it is excluded from the library type-check.

The esbuild override keeps the build dependency on 0.28.1 because tsup's declared
0.27.x range includes the affected Windows development-server versions in
[GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr).

## 🪪 License

[MIT © Tiaan du Plessis](./LICENSE)
