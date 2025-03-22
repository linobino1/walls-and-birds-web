import { useEffect, useState } from "react";
import { animate } from "motion";

export const AutoScroll = () => {
  const scrollDown = () => {
    animate(0, document.body.scrollHeight, {
      type: "tween",
      duration: 2,
      onUpdate: (value) => window.scrollTo(0, value),
    });
  };
  const scrollUp = () => {
    // reset body scroll
    window.scrollTo(0, 0);
  };

  const [activated, setActivated] = useState(true);

  const scrollDownTime = 5000;
  const scrollUpTime = 3000;

  // deactivate autoscroll if the page is too short
  useEffect(() => {
    if (document.body.scrollHeight < window.innerHeight + 200) {
      setActivated(false);
    } else {
      document.body.onscroll = () => {
        console.log("scrolling detected");
        setActivated(false);
      };
    }
  }, []);

  // trigger autoscroll
  useEffect(() => {
    console.log("activated");
    // scroll to the bottom after 2 seconds
    const interval = setInterval(() => {
      setTimeout(() => {
        if (!activated) return;
        scrollDown();
      }, scrollDownTime);
      setTimeout(() => {
        if (!activated) return;
        scrollUp();
      }, scrollDownTime + scrollUpTime);
    }, scrollDownTime + scrollUpTime);

    return () => clearInterval(interval);
  }, [activated]);

  return null;
};
