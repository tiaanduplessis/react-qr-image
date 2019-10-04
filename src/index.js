import React from 'react'
import qr from 'qr-image-color'

// https://github.com/facebook/react/issues/9255#issuecomment-452368065
const getTextFromChildren = (children) => {
  let label = ''

  React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      label += child
    }
  })

  return label
}

const QRImage = ({ text, ecLevel, size, margin, transparent, color, background, children, ...props }) => {
  const options = {
    type: 'png',
    ecLevel,
    size,
    margin,
    transparent,
    color,
    background
  }
  const svgStr = qr.imageSync(text || getTextFromChildren(children), options)
  const uri = `data:image/png;base64, ${svgStr.toString('base64')}`
  return <img alt='' {...props} src={uri} />
}

QRImage.defaultProps = {
  text: '',
  ecLevel: 'M', // Error correction level
  size: 5, // Size of one module in pixels
  margin: 4, // White space around QR image in modules
  transparent: false,
  background: undefined, // Color for code background
  color: '#333' //  Color for code blocks
}

export default React.memo(QRImage)
