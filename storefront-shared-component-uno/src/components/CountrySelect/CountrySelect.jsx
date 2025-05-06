import styles from "./CountrySelect.module.css";
import React, { useCallback, useEffect, useRef, useState } from "react";

const scaleSize = 1.25;
// const flagSvgSize = {
//   w: 645 * scaleSize,
//   h: 515 * scaleSize,
// };
const displayFlagSize = {
  w: 20 * scaleSize,
  h: 15 * scaleSize,
};
const gap = {
  x: 5 * scaleSize,
  y: 5 * scaleSize,
};
const posFlagSize = {
  w: displayFlagSize.w + gap.x,
  h: displayFlagSize.h + gap.y,
};

export const CountrySelect = ({ optionValue, handleCountryChange }) => {
  const [country, setCountry] = useState(null);
  
  const firstTime = useRef(true)

  const calcPos = (letter, size) => {
    return -(letter.toLowerCase().charCodeAt(0) - 97) * size;
  };

  const setFlagPositionFunc = useCallback((iso) => {
    const x = calcPos(iso[1], posFlagSize.w);
    const y = calcPos(iso[0], posFlagSize.h);
    return { x: x, y: y };
  }, []);

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const xPos = selectedOption.dataset.xPos + "px ";
    const yPos = selectedOption.dataset.yPos + "px";
    setCountry([xPos, yPos].join(""));
    handleCountryChange(selectedOption.dataset.countryCode);
  };

  const updateData = useCallback(() => {
    if (optionValue) {
      const selectedOption = window?.country_list?.[optionValue?.countryIndex] ?? window?.country_list.find(
        (option) => `+${option?.phoneCode}` === optionValue?.phoneCode|| `+${option.phoneCode}` === optionValue?.phone
      );
      if (selectedOption) {
        const xPos = setFlagPositionFunc(selectedOption.code).x + "px ";
        const yPos = setFlagPositionFunc(selectedOption.code).y + "px";
        setCountry([xPos, yPos].join(""));
        handleCountryChange(`+${selectedOption.phoneCode}`);
      }
    }
  }, [optionValue, setFlagPositionFunc, handleCountryChange])

  useEffect(() => {
    if(firstTime.current && optionValue) {
      firstTime.current = false;
      updateData()
    } 
  }, [optionValue, firstTime, updateData]);
  
  return (
    <div className={styles.flits_country_dropdown}>
      <span
        className={styles.flits_country_flag}
        style={{
          backgroundPosition: country,
        }}
      ></span>
      <div className={styles.flits_select_row}>
        <select onChange={handleSelectChange} className={styles.flits_input} defaultValue={optionValue.phoneCode}>
          {window?.country_list.map((option, index) => (
            <option
              key={index}
              data-country-iso-code={option.code}
              data-country-flag={option.code
                .toUpperCase()
                .replace(/./g, (char) =>
                  String.fromCodePoint(char.charCodeAt(0) + 127397)
                )}
              data-country-code={"+" + option.phoneCode}
              data-x-pos={setFlagPositionFunc(option.code).x}
              data-y-pos={setFlagPositionFunc(option.code).y}
              value={"+" + option.phoneCode}
            >
              {`${option.countryName} (+${option.phoneCode})`}
            </option>
          ))}
        </select>
        <div className={styles.flits_select_arrow}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
