import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { ClockSVG } from "./ClockSVG"
import { DateTime } from "./DateTime"

export const Clock = () => {
  const [formattedTime, setFormattedTime] = useState("");
  const [hourAngle, setHourAngle] = useState("");
  const [minuteAngle, setMinuteAngle] = useState("");
  const [secondAngle, setSecondAngle] = useState("");
  useEffect(() => {
    setInterval(() => {
      var settings = {
        datetime: new Date(),
        hour: true,
        minute: true,
        second: true,
        ampm: true,
        hours12: true,
        svgClock: true,
      };
      let Hh;
      let Mm;
      let Ss;
      let ap;
      let formattedTime;
      Hh = settings.datetime.getHours();
      Mm = settings.datetime.getMinutes();
      Ss = settings.datetime.getSeconds();
      Mm = Mm < 10 ? "0" + Mm : Mm;
      ap = Hh >= 12 ? "PM" : "AM";
      if (settings.hours12) {
        Hh = Hh % 12;
        Hh = Hh ? Hh : 12; // the hour '0' should be '12'
      }
      Hh = Hh < 10 ? "0" + Hh : Hh;
      Ss = Ss < 10 ? "0" + Ss : Ss;
      if (!settings.hour) {
        Hh = "";
      }
      settings.minute ? (Mm = ":" + Mm) : (Mm = "");
      settings.second ? (Ss = ":" + Ss) : (Ss = "");
      if (!settings.hours12 || !settings.ampm) {
        ap = "";
      }
      formattedTime = Hh + Mm + Ss + " " + ap;

      // FOR SVG CLOCK
      let hourAngle =
        30 * (settings.datetime.getHours() % 12) +
        settings.datetime.getMinutes() / 2;
      let minuteAngle = 6 * settings.datetime.getMinutes();
      let secondAngle = 6 * settings.datetime.getSeconds();
      setHourAngle(hourAngle);
      setMinuteAngle(minuteAngle);
      setSecondAngle(secondAngle);
      setFormattedTime(formattedTime);
    }, 1000);
  }, []);
  if (formattedTime === "") {
    return null;
  }
  return (
    <>
      <Suspense fallback={<></>}>
        <ClockSVG
          hourAngle={hourAngle}
          minuteAngle={minuteAngle}
          secondAngle={secondAngle}
        />
        <DateTime formattedTime={formattedTime} />
      </Suspense>
    </>
  );
};
