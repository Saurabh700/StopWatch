import { useEffect, useRef, useState } from "react";

const StopWatchUseRef = () => {
  var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };
  const timerId = useRef(null);
  const [watch, setWatch] = useState(0);
  const start = () => {
    console.log(timerId);
    if (!timerId.current) {
      let id = setInterval(() => {
        setWatch((prev) => prev + 1);
      }, 1000);
      timerId.current = id;
      console.log(timerId);
    }
  };
  const pause = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };
  const stop = () => {
    clearInterval(timerId.current);
    setWatch(0);
    timerId.current = null;
  };

  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  return (
    <div>
      StopWatch:{toHHMMSS(watch)}
      <div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatchUseRef;
