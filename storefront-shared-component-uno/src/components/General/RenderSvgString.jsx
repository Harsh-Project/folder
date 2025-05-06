import React from "react";

export const RenderSvgString = ({ svgString }) => {
  return <span dangerouslySetInnerHTML={{ __html: svgString }}></span>;
};
