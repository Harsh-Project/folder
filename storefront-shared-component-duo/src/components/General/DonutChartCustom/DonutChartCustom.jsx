import styles from "./DonutChartCustomModule.module.css";
import React, { Suspense } from "react";
import { CircleCreate } from './CircleCreate';
import { MoneyFormat } from "../MoneyFormat/MoneyFormat";

export const DonutChartCustom = ({ settings }) => {

  let seriesData = settings?.seriesData;
  let svgWH = (settings?.radius || 50) * 2;
  let svgRadius = settings?.radius || 50;
  var rotate = 0;
  var oldItemValue = 0;

  return (
    <svg width={`${svgWH}%`} height={`${svgWH}%`}>
      <circle
        cx={`${svgRadius}%`}
        cy={`${svgRadius}%`}
        r={`${svgRadius}%`}
        fill="#f2f2f2"
      ></circle>
      {Object.keys(seriesData).map((key, index) => {
        let item = settings.seriesData[index];
        return (
          <Suspense fallback={<></>}>
            <CircleCreate
              settings={settings}
              rotate={rotate}
              item={item}
              index={index}
            />
            {(rotate = (360 * (item.value + oldItemValue)) / 100)}
            {(oldItemValue = item.value)}
          </Suspense>
        );
      })}
      <circle
        cx={`${svgRadius}%`}
        cy={`${svgRadius}%`}
        r={`${svgRadius - 19}%`}
        fill="#c1c0c0"
      ></circle>
      <circle
        cx={`${svgRadius}%`}
        cy={`${svgRadius}%`}
        r={`${svgRadius - 22}%`}
        fill="#fff"
      ></circle>
      <foreignObject
        x="0"
        y="0"
        width="100%"
        height="100%"
        className={styles.flits_chart_text}
      >
        <div
          className={styles.flits_chart_inner_title}
          style={{
            color: settings?.textStyle?.color || "#000",
            fontSize: settings?.textStyle?.fontSize || "12px",
            fontFamily: settings?.textStyle?.fontFamily || "inherit",
            fontWeight: settings?.textStyle?.fontWeight || "normal",
          }}
        >
          {parseFloat(settings?.title) < 0 ? "- " : ""} {<Suspense fallback={<></>}>
          <MoneyFormat price={Math.abs(settings?.title)} />
          </Suspense>}
        </div>
      </foreignObject>
    </svg>
  );
};
