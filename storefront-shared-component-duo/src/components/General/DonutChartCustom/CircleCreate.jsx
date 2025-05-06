import styles from "./DonutChartCustomModule.module.css";
import React, { useEffect, useState } from "react";

function shade(color, percent) {
  var f = parseInt(color.slice(1), 16);
  var t = percent < 0 ? 0 : 255;
  var p = percent < 0 ? percent * -1 : percent;
  var R = f >> 16;
  var G = (f >> 8) & 0x00ff;
  var B = f & 0x0000ff;
  var shadeColor =
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1);
  function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  return hexToRgb(shadeColor);
}

function lightOrDark(color) {
  var colorToHex = color;
  let hsp;
  let r;
  let b;
  let g;
  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );
    r = parseInt(color[1]);
    g = parseInt(color[2]);
    b = parseInt(color[3]);
    function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    colorToHex = rgbToHex(r, g, b);
  } else {
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));
    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  if (hsp > 127.5) {
    return shade(colorToHex, -0.4);
  } else {
    return shade(colorToHex, 0.4);
  }
}

export const CircleCreate = ({ settings, rotate, item, index }) => {
  let svgRadius = settings?.radius || 50;
  let outerRadius = svgRadius - 12;
  let innerRadius = svgRadius - 17;
  let outerStrokeDasharray = 2 * 3.14 * outerRadius;
  let innerStrokeDasharray = 2 * 3.14 * innerRadius;
  const [innerOffset, setInnerOffset] = useState(innerStrokeDasharray)
  const [outerOffset, setOuterOffset] = useState(outerStrokeDasharray)
  let outerStokeColor = item?.color;
  let innerStokeColor = lightOrDark(item?.color);

  useEffect(() => {
    let outerStrokeDashoffset =
      outerStrokeDasharray - (outerStrokeDasharray * item?.value) / 100;
    let innerStrokeDashoffset =
      innerStrokeDasharray - (innerStrokeDasharray * item?.value) / 100;

    setTimeout(() => {
      setOuterOffset(outerStrokeDashoffset)
      setInnerOffset(innerStrokeDashoffset)
    }, 500 * (index + 1));
  }, [item.value, innerStrokeDasharray, index, outerStrokeDasharray]);

  return (
    <>
      <circle
        cx={`${svgRadius}%`}
        cy={`${svgRadius}%`}
        r={`${outerRadius}%`}
        fill="none"
        stroke={outerStokeColor}
        strokeWidth={`${settings?.outerStrokeWidth || 17.5}%`}
        className={`${styles.flits_outer_circle} ${
          styles[`flits_${item.name}_circle`]
        }`}
        strokeDasharray={`${outerStrokeDasharray}%`}
        strokeDashoffset={`${outerOffset}%`}
        transform-origin={`${svgRadius}% ${svgRadius}%`}
        style={{
          transition: "0.5s stroke-dashoffset",
          transform: `rotate(${rotate}deg)`,
        }}
      ></circle>
      <circle
        cx={`${svgRadius}%`}
        cy={`${svgRadius}%`}
        r={`${innerRadius}%`}
        fill="none"
        stroke={innerStokeColor}
        strokeWidth={`${settings?.innerStrokeWidth || 6.15}%`}
        strokeDasharray={`${innerStrokeDasharray}%`}
        className={`${styles.flits_inner_circle} ${
          styles[`flits_${item.name}_circle`]
        }`}
        strokeDashoffset={`${innerOffset}%`}
        transform-origin={`${svgRadius}% ${svgRadius}%`}
        style={{
          transition: "0.5s stroke-dashoffset",
          transform: `rotate(${rotate}deg)`,
        }}
      ></circle>
    </>
  );
};
