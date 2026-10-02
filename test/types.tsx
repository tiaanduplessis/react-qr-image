import React from "react";
import ReactQRImage, { QRImageProps } from "../src";

// Keep the existing public contract, including its required color/background/
// transparency/children fields. This toolchain refresh does not change the API.
const props: QRImageProps = {
  text: "local type fixture",
  ecLevel: "M",
  size: 5,
  margin: 4,
  transparent: false,
  background: "white",
  color: "black",
  children: "hello",
};
const image: React.ReactElement = <ReactQRImage {...props} />;
void image;

// @ts-expect-error QR text remains a string
const invalid: QRImageProps = { ...props, text: 123 };
void invalid;
