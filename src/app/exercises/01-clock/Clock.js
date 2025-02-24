"use client";
import React from "react";
import format from "date-fns/format";

function Clock() {
  const [time, setTime] = React.useState(); //initialized as undefined

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return <p className="clock">{time ? format(time, "hh:mm:ss.S a") : "---"}</p>;
}

export default Clock;
