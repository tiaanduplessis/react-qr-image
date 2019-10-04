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
