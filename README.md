<div align="center">
  <img src="./header.png" alt="Preview of QR codes generated">
</div>

# react-qr-image
[![package version](https://img.shields.io/npm/v/react-qr-image.svg?style=flat-square)](https://npmjs.org/package/react-qr-image)
[![package downloads](https://img.shields.io/npm/dm/react-qr-image.svg?style=flat-square)](https://npmjs.org/package/react-qr-image)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/react-qr-image.svg?style=flat-square)](https://npmjs.org/package/react-qr-image)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Generate a QR Image for your React app

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [Install](#install)
- [Contribute](#contribute)
- [License](#License)

## About

Build on the top of the excellent [qr-image-color](https://github.com/bockoblur/qr-image-color) package.

## Usage

```js
import React from "react";
import ReactDOM from "react-dom";

import QRImage from 'react-qr-image'

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

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com).

```sh
$ npm install react-qr-image
$ # OR
$ yarn add react-qr-image
```

## Contribute

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT
