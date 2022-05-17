import React, { useMemo, ReactNode } from "react";
import qr, { image_type } from "qr-image-color";

const getTextFromChildren = (children: any) => {
  let label = "";

  React.Children.map(children, (child) => {
    if (typeof child === "string") {
      label += child;
    }
  });

  return label;
};

export interface QRImageProps {
  text?: string;
  /**
   * Error correction level
   */
  ecLevel?: string;
  /**
   * Size of one module in pixels
   */
  size?: number;
  /**
   * White space around QR image in modules
   */
  margin?: number;
  transparent: boolean;
  /**
   * Color for code background
   */
  background: string;
  /**
   * Color for code blocks
   */
  color: string;
  children: ReactNode;
}

const ReactQRImage = ({
  text = "",
  ecLevel = "M",
  size = 5,
  margin = 4,
  transparent = false,
  color = "#000",
  background,
  children,
  ...props
}: QRImageProps) => {
  const options = useMemo(
    () => ({
      type: "png" as image_type,
      ecLevel,
      size,
      margin,
      transparent,
      color,
      background,
    }),
    [ecLevel, size, margin, transparent, color, background]
  );

  const uri = useMemo(() => {
    const svgStr = qr.imageSync(text || getTextFromChildren(children), options);
    return `data:image/png;base64, ${svgStr.toString("base64")}`;
  }, [options, children, text]);

  return <img alt="" {...props} src={uri} />;
};

export default ReactQRImage;
