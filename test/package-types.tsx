import React from "react";
import ReactQRImage, { QRImageProps } from "../dist";

const props: QRImageProps = {
  text: "packed declaration fixture",
  transparent: false,
  background: "white",
  color: "black",
  children: "hello",
};
const image: React.ReactElement = <ReactQRImage {...props} />;
void image;

// @ts-expect-error Generated declarations must keep the string text contract
const invalid: QRImageProps = { ...props, text: 123 };
void invalid;
